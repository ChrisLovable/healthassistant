// app/api/transcribe/route.ts
// Routes STT by language: ElevenLabs Scribe for en/af, Google Cloud STT for xh/zu/st
import { NextRequest, NextResponse } from 'next/server';
import speech from '@google-cloud/speech';
import FormData from 'form-data';
import axios from 'axios';

export const runtime = 'nodejs'; // Google client libs do not work on the edge runtime
export const maxDuration = 60;

// Build the Google Speech client. Two paths:
//   - Local dev: GOOGLE_APPLICATION_CREDENTIALS env var points to the JSON file
//   - Vercel/Render: split into GOOGLE_CLIENT_EMAIL / GOOGLE_PRIVATE_KEY / GOOGLE_PROJECT_ID
const speechClient = (() => {
  if (process.env.GOOGLE_CLIENT_EMAIL && process.env.GOOGLE_PRIVATE_KEY) {
    return new speech.SpeechClient({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      },
      projectId: process.env.GOOGLE_PROJECT_ID,
    });
  }
  return new speech.SpeechClient();
})();

const GOOGLE_LANG: Record<string, string> = {
  xh: 'xh-ZA',
  zu: 'zu-ZA',
  st: 'st-ZA',
};

const ELEVEN_LANG: Record<string, string> = {
  en: 'eng',
  af: 'afr',
};

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const audioFile = formData.get('audio') as File | null;
    const language = (((formData.get('language') || formData.get('lang')) as string) || 'en').toLowerCase();

    if (!audioFile) {
      return NextResponse.json({ error: 'No audio file uploaded' }, { status: 400 });
    }

    const audioBuffer = Buffer.from(await audioFile.arrayBuffer());
    let transcript = '';

    if (ELEVEN_LANG[language]) {
      // ---- ElevenLabs Scribe path (English, Afrikaans) ----
      const form = new FormData();
      form.append('file', audioBuffer, {
        filename: 'audio.webm',
        contentType: audioFile.type || 'audio/webm',
      });
      form.append('model_id', 'scribe_v1');
      form.append('language_code', ELEVEN_LANG[language]);

      const { data } = await axios.post(
        'https://api.elevenlabs.io/v1/speech-to-text',
        form,
        {
          headers: {
            ...form.getHeaders(),
            'xi-api-key': (process.env.ELEVENLABS_API_KEY || process.env.ELEVEN_LABS_API_KEY) as string,
          },
          timeout: 60000,
          maxBodyLength: Infinity,
        }
      );
      transcript = data.text || '';

    } else if (GOOGLE_LANG[language]) {
      // ---- Google Cloud STT path (Xhosa, Zulu, Sesotho) ----
      const [response] = await speechClient.recognize({
        audio: { content: audioBuffer.toString('base64') },
        config: {
          encoding: 'WEBM_OPUS',         // matches MediaRecorder's default on Chrome/Edge
          sampleRateHertz: 48000,
          languageCode: GOOGLE_LANG[language],
          enableAutomaticPunctuation: true,
          model: 'default',
        },
      });
      transcript = (response.results || [])
        .map((r) => r.alternatives?.[0]?.transcript || '')
        .join(' ')
        .trim();

    } else {
      return NextResponse.json(
        { error: `Unsupported language: ${language}` },
        { status: 400 }
      );
    }

    // Optional: post-process medical-term mistranscriptions you discover during testing
    // transcript = normalizeMedicalTerms(transcript, language);

    return NextResponse.json({ transcript, text: transcript, language });

  } catch (err: any) {
    console.error('Transcribe failed:', err?.response?.data || err.message, err?.stack); try { require('fs').appendFileSync('C:/phila/transcribe-error.log', new Date().toISOString() + ' ' + (err?.stack || err?.message || JSON.stringify(err)) + '\n'); } catch {}
    return NextResponse.json(
      { error: 'Transcription failed', detail: err.message },
      { status: 500 }
    );
  }
}

// Post-processing hook for medical-term fixes. Build this dict from real user transcripts.
// function normalizeMedicalTerms(text: string, lang: string): string {
//   const FIX_MAP: Record<string, Record<string, string>> = {
//     xh: { 'i pira sit amol': 'i-paracetamol', 'kolesterole': 'i-cholesterol' },
//     zu: { /* ... */ },
//     st: { /* ... */ },
//   };
//   const fixes = FIX_MAP[lang] || {};
//   let out = text;
//   for (const [bad, good] of Object.entries(fixes)) {
//     out = out.replace(new RegExp(bad, 'gi'), good);
//   }
//   return out;
// }
