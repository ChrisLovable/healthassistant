const fs = require('fs');
const path = require('path');

const dir = 'c:/phila/src/data/diseases';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.af.json'));

const SKIP_KEYS = new Set(['slug','group_slug','hero_image','color','icon','link','phone','last_reviewed','next_review','reviewer','sources']);

function applyGeneral(text){
  let s = text;
  s = s.replace(/(^|\s)'n\b/g, "$1’n");
  s = s.replace(/vaksiene-inligting/gi, 'inentingsinligting');
  s = s.replace(/booster-skote/gi, 'versterkingsdosisse');
  s = s.replace(/\bboost beskerming\b/gi, 'versterk beskerming');
  s = s.replace(/opdaterende vaksiene/gi, 'opgedateerde inentings');
  s = s.replace(/\buitbreidings\b/gi, 'uitbrake');
  s = s.replace(/\bstyf bors\b/gi, 'borsbenoudheid');
  s = s.replace(/maag-ontsteltenis/gi, 'omgekrapte maag');
  s = s.replace(/alarm-stelsel/gi, 'alarmstelsel');
  s = s.replace(/hand-higiëne/gi, 'handhigiëne');
  s = s.replace(/griep-seisoen/gi, 'griepseisoen');
  s = s.replace(/heel-liggaam-spierpyn/gi, 'spierpyn oor die hele liggaam');
  s = s.replace(/rondom-faktor/gi, 'omgewingsfaktor');
  s = s.replace(/tuis-bloeddrukmeter/gi, 'bloeddrukmeter vir tuisgebruik');
  s = s.replace(/Trop-immuniteit/gi, 'groepsimmuniteit');
  s = s.replace(/HIV-koppeling/gi, 'verband met HIV');
  s = s.replace(/vroeg afdraai/gi, 'behandeling vroeg staak');
  s = s.replace(/GORD \(gastro-esofageale reflukssiekte\)/gi, 'reflukssiekte (gastro-oesofageale reflukssiekte)');
  s = s.replace(/teer-stoele/gi, 'swart, teeragtige stoelgang');
  s = s.replace(/pelvies-/gi, 'bekken-');
  s = s.replace(/pelvies/gi, 'bekken');
  s = s.replace(/Werd om te ondersoek/gi, 'Die moeite werd om te ondersoek');

  // cold illness context
  s = s.replace(/\berge koue\b/gi, 'erge verkoue');
  s = s.replace(/\bnet ’n koue\b/gi, 'net ’n verkoue');
  s = s.replace(/\bnet 'n koue\b/gi, 'net ’n verkoue');
  s = s.replace(/\bKoue — stadig en lig\b/g, 'Verkoue — stadig en lig');
  s = s.replace(/\bviruskoue\b/gi, 'verkoues');

  // vaccine wording (public-facing)
  s = s.replace(/\bvaksiene\b/gi, 'inentings');
  s = s.replace(/\bvaksien\b/gi, 'inenting');
  s = s.replace(/vaksien-voorkombaar/gi, 'kan met inenting voorkom word');
  s = s.replace(/griepinentinge?/gi, 'griepinenting');
  s = s.replace(/HPV-inentinge?/gi, 'HPV-inenting');
  s = s.replace(/rotavirus-inentinge?/gi, 'rotavirus-inenting');
  s = s.replace(/pneumokokke-inentinge?/gi, 'pneumokokke-inenting');
  s = s.replace(/reisinentings/gi, 'reis-inentings');

  return s;
}

function transform(node, key=''){
  if (Array.isArray(node)) return node.map(v => transform(v, key));
  if (node && typeof node === 'object') {
    const out = {};
    for (const [k,v] of Object.entries(node)) {
      out[k] = SKIP_KEYS.has(k) ? v : transform(v, k);
    }
    return out;
  }
  if (typeof node === 'string') {
    if (key === 'phone_display') return node;
    return applyGeneral(node);
  }
  return node;
}

for (const file of files) {
  const full = path.join(dir, file);
  const json = JSON.parse(fs.readFileSync(full, 'utf8'));
  const updated = transform(json);

  // file-specific tweaks
  if (file === 'acne.af.json') {
    if (updated.tagline) updated.tagline = updated.tagline.replace('ernstige aknee','erge aknee');
    if (updated.what_is_it?.paragraphs?.[1]) updated.what_is_it.paragraphs[1] = updated.what_is_it.paragraphs[1].replace('selfbeeld vir jare raak','selfbeeld vir jare beïnvloed');
    if (updated.action_steps?.items?.[1]?.description) updated.action_steps.items[1].description = updated.action_steps.items[1].description.replace('Voorskrif topiese retinoïede en antibiotika','Voorskrif retinoïedroom of -gel wat op die vel gesmeer word, en antibiotika');
  }

  if (file === 'anxiety.af.json') {
    const replaceAnx = (s)=> s.replace(/gereedskap wat help/gi,'tegnieke en hulp wat help').replace(/warm of koue gloed/gi,'warm gloede of koue rillings');
    // apply to all strings recursively quick
    const rec=(x)=>Array.isArray(x)?x.map(rec):x&&typeof x==='object'?Object.fromEntries(Object.entries(x).map(([k,v])=>[k, rec(v)])):typeof x==='string'?replaceAnx(x):x;
    Object.assign(updated, rec(updated));
  }

  if (file === 'asthma-attack.af.json') {
    const rec=(x)=>Array.isArray(x)?x.map(rec):x&&typeof x==='object'?Object.fromEntries(Object.entries(x).map(([k,v])=>[k, rec(v)])):typeof x==='string'?x.replace(/verligter-inhaleerder/gi,'verligtingspompie').replace(/voorkomer/gi,'voorkomingspompie').replace(/Stille bors/gi,'stil borskas').replace(/vel suig in/gi,'vel trek in').replace(/die voering swel/gi,'die binnekant van die lugweë swel'):x;
    Object.assign(updated, rec(updated));
  }

  if (file === 'asthma-children.af.json') {
    const rec=(x)=>Array.isArray(x)?x.map(rec):x&&typeof x==='object'?Object.fromEntries(Object.entries(x).map(([k,v])=>[k, rec(v)])):typeof x==='string'?x.replace(/voorkomer/gi,'voorkomingspompie'):x;
    Object.assign(updated, rec(updated));
  }

  if (file === 'breast-cancer.af.json') {
    const rec=(x)=>Array.isArray(x)?x.map(rec):x&&typeof x==='object'?Object.fromEntries(Object.entries(x).map(([k,v])=>[k, rec(v)])):typeof x==='string'?x.replace(/geen knop kan op gevoel alleen veilig vertroulik geword nie/gi,'geen knop kan veilig net op gevoel beoordeel word nie').replace(/sists/gi,'siste').replace(/vesel-ophopings/gi,'veselagtige knoppe').replace(/Skerming-mammogramme/gi,'Siftingsmammogramme').replace(/Vroeg-vang/gi,'Vroeë opsporing'):x;
    Object.assign(updated, rec(updated));
  }

  if (file === 'cervical-cancer-hpv.af.json') {
    const rec=(x)=>Array.isArray(x)?x.map(rec):x&&typeof x==='object'?Object.fromEntries(Object.entries(x).map(([k,v])=>[k, rec(v)])):typeof x==='string'?x.replace(/kanker-dood/gi,'kankersterftes').replace(/Behoeft urgente assessering/gi,'Benodig dringende ondersoek').replace(/urinerings- of stoelgang-veranderinge/gi,'veranderinge in urinering of stoelgang').replace(/Toestemming-vorms huis toe/gi,'Toestemmingsvorms word huis toe gestuur'):x;
    Object.assign(updated, rec(updated));
  }

  if (file === 'child-fever.af.json') {
    const rec=(x)=>Array.isArray(x)?x.map(rec):x&&typeof x==='object'?Object.fromEntries(Object.entries(x).map(([k,v])=>[k, rec(v)])):typeof x==='string'?x.replace(/Meeste kinder-koorse/gi,'Die meeste koors by kinders').replace(/kry by 'n kliniek of hospitaal uit/gi,'gaan na ’n kliniek of hospitaal').replace(/Ouers tel subtiele veranderinge raak/gi,'Ouers merk dikwels subtiele veranderinge op').replace(/om iets te misluk/gi,'om iets ernstigs mis te kyk').replace(/sleutel-vaardigheid/gi,'belangrikste vaardigheid'):x;
    Object.assign(updated, rec(updated));
  }

  if (file === 'childhood-diarrhoea.af.json') {
    const rec=(x)=>Array.isArray(x)?x.map(rec):x&&typeof x==='object'?Object.fromEntries(Object.entries(x).map(([k,v])=>[k, rec(v)])):typeof x==='string'?x.replace(/kinder-diarree/gi,'kinderdiarree').replace(/Die moeite werd vir die klein daaglikse inset/gi,'Klein daaglikse gewoontes maak ’n groot verskil').replace(/\bORS\b/,'orale rehidrasie-oplossing (ORS)'):x;
    Object.assign(updated, rec(updated));
  }

  if (file === 'covid-19.af.json') {
    const rec=(x)=>Array.isArray(x)?x.map(rec):x&&typeof x==='object'?Object.fromEntries(Object.entries(x).map(([k,v])=>[k, rec(v)])):typeof x==='string'?x.replace(/effe griep/gi,'ligte griep').replace(/immuun-onderdruk/gi,'immuunonderdruk').replace(/net minder dood as voorheen/gi,'veroorsaak minder sterftes as vroeër').replace(/DNA-veranderingseffek/gi,'verander jou DNA').replace(/swak gevoeligheid/gi,'swak reaksie'):x;
    Object.assign(updated, rec(updated));
  }

  if (file === 'flu.af.json') {
    const rec=(x)=>Array.isArray(x)?x.map(rec):x&&typeof x==='object'?Object.fromEntries(Object.entries(x).map(([k,v])=>[k, rec(v)])):typeof x==='string'?x.replace(/ICU-besoek/gi,'opname in intensiewe sorg').replace(/mees-effektiewe/gi,'mees effektiewe'):x;
    Object.assign(updated, rec(updated));
  }

  if (file === 'fungal-skin.af.json') {
    const rec=(x)=>Array.isArray(x)?x.map(rec):x&&typeof x==='object'?Object.fromEntries(Object.entries(x).map(([k,v])=>[k, rec(v)])):typeof x==='string'?x.replace(/Omloop/gi,'ringwurm').replace(/lies-jeuk/gi,'jeuk in die liesarea'):x;
    Object.assign(updated, rec(updated));
  }

  if (file === 'heartburn-reflux.af.json') {
    const rec=(x)=>Array.isArray(x)?x.map(rec):x&&typeof x==='object'?Object.fromEntries(Object.entries(x).map(([k,v])=>[k, rec(v)])):typeof x==='string'?x.replace(/Sooibrand & refluks/gi,'Sooibrand en refluks').replace(/sensasie/gi,'gevoel').replace(/wanneer lê/gi,'wanneer jy lê').replace(/PPI's soos omeprasool/gi,'protonpompremmers, soos omeprazool').replace(/aanvaar hart en bel 10177/gi,'behandel dit as moontlik hartverwant en bel 10177').replace(/Werd om/gi,'Die moeite werd'):x;
    Object.assign(updated, rec(updated));
  }

  if (file === 'high-blood-pressure.af.json') {
    const rec=(x)=>Array.isArray(x)?x.map(rec):x&&typeof x==='object'?Object.fromEntries(Object.entries(x).map(([k,v])=>[k, rec(v)])):typeof x==='string'?x.replace(/niermisluk/gi,'nierversaking').replace(/SA-koste het ekstra hoë soutpeile in baie kos/gi,'Baie Suid-Afrikaanse kosse bevat baie sout'):x;
    Object.assign(updated, rec(updated));
  }

  if (file === 'meningitis.af.json') {
    const rec=(x)=>Array.isArray(x)?x.map(rec):x&&typeof x==='object'?Object.fromEntries(Object.entries(x).map(([k,v])=>[k, rec(v)])):typeof x==='string'?x.replace(/Openbare Gesondheid/gi,'die openbare gesondheidsdiens').replace(/uit dieselfde koppie gedrink/gi,'uit dieselfde beker gedrink'):x;
    Object.assign(updated, rec(updated));
  }

  if (file === 'pneumonia.af.json') {
    const rec=(x)=>Array.isArray(x)?x.map(rec):x&&typeof x==='object'?Object.fromEntries(Object.entries(x).map(([k,v])=>[k, rec(v)])):typeof x==='string'?x.replace(/gekleurde of bloederige spoeg/gi,'verkleurde of bloedbevlekte slym').replace(/longontsteking-dood/gi,'sterfte weens longontsteking'):x;
    Object.assign(updated, rec(updated));
  }

  if (file === 'pregnancy-danger-signs.af.json') {
    const rec=(x)=>Array.isArray(x)?x.map(rec):x&&typeof x==='object'?Object.fromEntries(Object.entries(x).map(([k,v])=>[k, rec(v)])):typeof x==='string'?x.replace(/moeder-sterfte/gi,'moedersterfte').replace(/vooraf-bestaande/gi,'voorafbestaande').replace(/om iets ernstig te misluk/gi,'om iets ernstigs mis te kyk').replace(/waarskuwings wat afgemaak of misluk is/gi,'waarskuwingstekens wat afgemaak of misgekyk is').replace(/Moenie simptome tuis tyd hou nie/gi,'Moenie by die huis wag en kyk hoe lank dit aanhou nie'):x;
    Object.assign(updated, rec(updated));
  }

  if (file === 'prostate-problems.af.json') {
    const rec=(x)=>Array.isArray(x)?x.map(rec):x&&typeof x==='object'?Object.fromEntries(Object.entries(x).map(([k,v])=>[k, rec(v)])):typeof x==='string'?x.replace(/Drie hoof-dinge/gi,'Drie hoofprobleme').replace(/prostaat-vergroting/gi,'prostaatvergroting').replace(/urinêre simptome/gi,'urineringsimptome').replace(/Benodig dringende assessering/gi,'moet dringend ondersoek word'):x;
    Object.assign(updated, rec(updated));
  }

  if (file === 'stis.af.json') {
    const rec=(x)=>Array.isArray(x)?x.map(rec):x&&typeof x==='object'?Object.fromEntries(Object.entries(x).map(([k,v])=>[k, rec(v)])):typeof x==='string'?x.replace(/chlamidia/gi,'chlamydia').replace(/seksueel raak/gi,'seksueel aktief raak'):x;
    Object.assign(updated, rec(updated));
  }

  if (file === 'substance-use.af.json') {
    const rec=(x)=>Array.isArray(x)?x.map(rec):x&&typeof x==='object'?Object.fromEntries(Object.entries(x).map(([k,v])=>[k, rec(v)])):typeof x==='string'?x.replace(/middelgebruik/gi,'alkohol- of dwelmgebruik').replace(/beloning- en stres-stelsels/gi,'belonings- en stresstelsels').replace(/brein-stroombane/gi,'breinbane'):x;
    Object.assign(updated, rec(updated));
  }

  if (file === 'tb.af.json') {
    const rec=(x)=>Array.isArray(x)?x.map(rec):x&&typeof x==='object'?Object.fromEntries(Object.entries(x).map(([k,v])=>[k, rec(v)])):typeof x==='string'?x.replace(/weerstandig word/gi,'weerstandig teen behandeling word').replace(/Tuis-oppervlakke aanraak/gi,'oppervlaktes by die huis aanraak'):x;
    Object.assign(updated, rec(updated));
  }

  if (file === 'uti.af.json') {
    const rec=(x)=>Array.isArray(x)?x.map(rec):x&&typeof x==='object'?Object.fromEntries(Object.entries(x).map(([k,v])=>[k, rec(v)])):typeof x==='string'?x.replace(/Brand wanneer urineer/gi,'Brand wanneer jy urineer').replace(/moet gereeld urineer/gi,'jy moet gereeld urineer').replace(/pelvies- of onderbuik-ongemak/gi,'bekken- of onderbuikongemak').replace(/kort antibiotika-kursus klaar die meeste UWI's op/gi,'’n kort antibiotikakursus behandel die meeste UWI’s').replace(/uit te ry/gi,'uit te wag').replace(/kweek weerstand/gi,'kan weerstandigheid bevorder').replace(/nier-UWI/gi,'nierinfeksie'):x;
    Object.assign(updated, rec(updated));
  }

  fs.writeFileSync(full, JSON.stringify(updated, null, 2) + '\n', 'utf8');
}

// Add hiv.af.json if missing
const hivAf = path.join(dir, 'hiv.af.json');
const hivEn = path.join(dir, 'hiv.en.json');
if (!fs.existsSync(hivAf) && fs.existsSync(hivEn)) {
  const en = JSON.parse(fs.readFileSync(hivEn, 'utf8'));
  const af = JSON.parse(JSON.stringify(en));
  af.name = 'HIV';
  af.tagline = 'Toets, behandel, onopspoorbaar. Leef ’n vol lewe.';
  af.what_is_it.heading = 'HIV in gewone taal';
  af.what_is_it.lede = 'HIV staan vir Human Immunodeficiency Virus. Dit val die liggaam se verdedigingstelsel aan — spesifiek ’n soort witbloedsel wat CD4-selle genoem word.';
  af.what_is_it.paragraphs = [
    'Sonder behandeling kan HIV die immuunstelsel oor jare verswak totdat die liggaam nie meer infeksies kan beveg nie. Daardie gevorderde stadium word VIGS genoem. Met behandeling bly HIV onder beheer, die immuunstelsel bly sterk, en mense leef vol, normale lewens.',
    'HIV is nie meer ’n doodsvonnis nie. In Suid-Afrika is behandeling gratis by elke staatskliniek, en die meeste mense op behandeling kan so lank leef soos enigiemand anders.'
  ];
  af.facts.heading = 'Vier dinge om te weet';
  af.facts.items[0].body = 'Suid-Afrikaners leef met HIV — meer as enige ander land in die wêreld.';
  af.facts.items[1].body = 'Behandeling is gratis by elke staatskliniek. Geen mediese fonds nodig nie.';
  af.facts.items[2].body = 'Onopspoorbaar beteken onoordraagbaar. Met doeltreffende behandeling kan jy HIV nie seksueel oordra nie.';
  af.facts.items[3].body = 'Swanger vroue op behandeling kan HIV-negatiewe babas hê. PMTCT werk.';
  af.facts.pull_quote.text = 'Toets is die enigste manier om jou status te ken. Simptome kan dit nie wys nie. Baie mense met HIV voel jare lank heeltemal gesond.';
  af.signs.heading = 'Wat jy kan opmerk';
  af.signs.lede = 'HIV het dikwels vir jare geen simptome nie. Dit is waarom toetsing belangriker is as om te wag om siek te voel.';
  af.signs.items[0].description = 'Koors, seer keel, geswelde kliere in nek of oksels, moegheid, uitslag, lyfseer. Dit voel dikwels soos griep en gaan self weg.';
  af.signs.items[1].description = 'Gereelde infeksies, onverklaarbare gewigsverlies, aanhoudende diarree, nagsweet, wit kolle in die mond, veluitslae wat nie wil genees nie.';
  af.signs.items[2].description = 'Jy kan nie van hoe jy voel weet of jy HIV het nie. Laat toets. Dit is vinnig, gratis en vertroulik.';
  af.spreads.heading = 'Wat HIV versprei — en wat nie';
  af.spreads.yes = [
    'Onbeskermde seks (vaginale, anale of orale seks)',
    'Deel van naalde of spuite',
    'Ma na baba tydens geboorte of borsvoeding (voorkombaar met behandeling)',
    'Bloed-tot-bloed kontak deur ’n oop wond'
  ];
  af.spreads.no = [
    'Drukkies, soen of hand vashou',
    'Deel van kos, drank, borde of eetgerei',
    'Muskiet- of insekbyte',
    'Toilette, swembaddens of storte',
    'Hoes, nies of sweet'
  ];
  af.myths.heading = 'Wat is waar en wat is nie';
  af.myths.items = [
    { myth: 'As jy HIV het, kan jy nie ’n normale lewe hê nie.', fact: 'Met behandeling leef mense met HIV so lank soos enigiemand anders, werk, maak kinders groot en reis normaal.' },
    { myth: 'Jy kan HIV kry deur ’n glas te deel of te soen.', fact: 'HIV versprei nie deur speeksel, sweet of gewone kontak nie. Net sekere liggaamsvloeistowwe dra die virus.' },
    { myth: 'Kondome werk nie regtig teen HIV nie.', fact: 'As dit reg en elke keer gebruik word, is kondome baie doeltreffend om HIV te voorkom.' },
    { myth: 'HIV-positiewe ouers kan nie HIV-negatiewe kinders hê nie.', fact: 'Met die PMTCT-program kan byna elke baba HIV-negatief gebore word, selfs as een of albei ouers HIV het.' }
  ];
  af.prevention.heading = 'Hoe om jouself te beskerm';
  af.prevention.lede = 'Suid-Afrika het sterk HIV-voorkomingsprogramme. Die meeste is gratis. Hier is wat werk.';
  af.prevention.items[0].description = 'Gebruik elke keer. Gratis by klinieke, apteke en selfs sommige vulstasies. Vrouekondome is ook gratis.';
  af.prevention.items[1].description = '’n Daaglikse pil wat HIV voorkom. Baie doeltreffend. Gratis by klinieke vir mense met hoër risiko.';
  af.prevention.items[2].description = 'As jy dink jy was pas blootgestel — gaan binne 72 uur kliniek toe. Noodpille kan keer dat HIV vasvat.';
  af.prevention.items[3].description = 'Laat toets elke 6–12 maande as jy seksueel aktief is. Paartjies kan saam toets. Uitslae binne 15 minute.';
  af.action_steps.heading = 'Jou volgende stappe';
  af.action_steps.items[0].description = 'Gaan binne 72 uur na ’n kliniek of ongevalle en vra vir PEP. Hoe vroeër, hoe beter — binne 24 uur is die beste.';
  af.action_steps.items[1].description = 'Laat toets. Dit is gratis, vinnig en vertroulik. By meeste klinieke is geen afspraak nodig nie. Neem ’n maat saam as jy kan.';
  af.action_steps.items[2].description = 'Begin behandeling onmiddellik. Dit is gratis. Behandeling werk die beste as dit vroeg begin — daar is geen voordeel om te wag nie.';
  af.action_steps.items[3].description = 'Neem jou medikasie elke dag op dieselfde tyd. Moenie dosisse oorslaan nie. As newe-effekte pla, praat met jou kliniek.';
  af.action_steps.items[4].description = 'Laat toets so vroeg as moontlik. As jy positief is, voorkom die PMTCT-program byna altyd oordrag na die baba.';
  af.get_help.heading = 'Wie om te bel, waarheen om te gaan';
  af.get_help.lede = 'Jy hoef dit nie alleen uit te werk nie. Hierdie dienste is gratis, vertroulik en nou beskikbaar.';
  af.get_help.helplines[0].description = 'Gratis, vertroulik, 24 uur per dag';
  af.get_help.helplines[0].meta = 'Berading · verwysing vir toetsing · behandelingsondersteuning';
  af.get_help.helplines[1].description = 'Vir jongmense · gratis, vriendelik en anoniem';
  af.get_help.helplines[1].meta = 'Ma–Vr 09:00–20:00 · Sa 09:00–18:00';
  af.get_help.helplines[2].description = 'Elke staatskliniek bied gratis HIV-toetsing en behandeling';
  af.get_help.helplines[2].meta = 'Geen afspraak · geen mediese fonds nodig · ID help';
  fs.writeFileSync(hivAf, JSON.stringify(af, null, 2) + '\n', 'utf8');
  console.log('Created hiv.af.json');
}

console.log('Updated AF files:', files.length);
