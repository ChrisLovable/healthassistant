#!/usr/bin/env python3
"""Comprehensive localisation cleanup for af, xh, zu, st disease JSON and catalog."""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DISEASES = ROOT / "src" / "data" / "diseases"
CATALOG = ROOT / "src" / "data" / "catalog-translations.json"

# Standard EN section headings -> locale (applied to all matching files)
HEADING_REPLACEMENTS: dict[str, list[tuple[str, str]]] = {
    "af": [
        ("What it is", "Wat dit is"),
        ("In plain terms", "In eenvoudige taal"),
        ("What you might notice", "Wat jy kan opmerk"),
        ("Four things worth knowing", "Vier dinge wat die moeite werd is om te weet"),
        ("What is true and what is not", "Wat waar is en wat nie waar is nie"),
        ("Your next steps", "Jou volgende stappe"),
        ("What to do", "Wat om te doen"),
        ("Where to go", "Waarheen om te gaan"),
        ("Get help", "Kry hulp"),
        ("Call now", "Bel nou"),
        ("Talk to someone now", "Praat nou met iemand"),
        ("See a clinic or hospital urgently if", "Gaan dringend kliniek toe of hospitaal toe as"),
        ("Red flags", "Gevaartekens"),
        ("Danger signs", "Gevaartekens"),
        ("Prevention", "Voorkoming"),
        ("Screening", "Sifting"),
        ("Symptoms", "Simptome"),
        ("Treatment", "Behandeling"),
        ("Diagnosis", "Diagnose"),
        ("Pending clinical review", "Kliniese hersiening is nog hangende"),
        ("Review pending", "Kliniese hersiening is nog hangende"),
        ("Common. Treatable.", "Algemeen. Behandelbaar."),
        ("medical advice", "mediese advies"),
        ("general health information", "algemene gesondheidsinligting"),
        ("over-the-counter", "sonder voorskrif"),
        ("counter-the-counter", "sonder voorskrif"),
    ],
    "xh": [
        ("What it is", "Yintoni"),
        ("In plain terms", "Ngamazwi alula"),
        ("What you might notice", "Iimpawu onokuzibona"),
        ("Four things worth knowing", "Izinto ezine ekufuneka uzazi"),
        ("What is true and what is not", "Okwenyaniso nokungeyonyaniso"),
        ("Your next steps", "Amanyathelo akho alandelayo"),
        ("What to do", "Into ekufuneka uyenzile"),
        ("Where to go", "Apho ungaya khona"),
        ("Get help", "Fumana uncedo"),
        ("Call now", "Tsalela umnxeba ngoku"),
        ("Talk to someone now", "Thetha nomntu ngoku"),
        ("See a clinic or hospital urgently if", "Yiya ekliniki okanye esibhedlele ngokukhawuleza ukuba"),
        ("Red flags", "Iimpawu eziyingozi"),
        ("Danger signs", "Iimpawu eziyingozi"),
        ("Prevention", "Uthintelo"),
        ("Screening", "Uvavanyo"),
        ("Symptoms", "Iimpawu"),
        ("Treatment", "Unyango"),
        ("Diagnosis", "Uxilongo"),
        ("Pending clinical review", "Ukuphononongwa kweklinikhi kusalindelwe"),
        ("Ulwazi lwezempilo onokuluthemba", "Ulwazi lwezempilo olunokuthenjwa"),
        ("eluleko lwezonyango", "ingcebiso yezonyango"),
        ("ukuqondiswa", "uxilongo"),
        ("Ucwangciso lokukhulelwa", "Ucwangciso-ntsapho"),
        ("Uxinzelelo lwengqondo (depression)", "Ukudakumba (depression)"),
        ("Uxinzelelo lwengqondo", "Ukudakumba (depression)"),
        ("Nceda umntu oginyekileyo", "Nceda umntu okrwitshwayo"),
        ("Indlela yokunyanga i-shock", "Indlela yokunceda umntu ose-shock-ini"),
        ("kwifama", "kwikhemesti"),
        (" iifama,", " iikhemesti,"),
        ("Ifama", "Ikhemesti"),
        ("ifama", "ikhemesti"),
        ("farmasi", "ikhemesti"),
        ("Eyona farmasi ikufuphi", "Ikhemesti ekufutshane"),
        ("over-the-counter", "ngaphandle kwegqirha"),
        ("counter-the-counter", "ngaphandle kwegqirha"),
        ("phezu-the-counter", "ngaphandle kwegqirha"),
        ("Qala phezu-the-counter antifungal cream", "Qala ngekhrimu ye-antifungal engaphandle kwegqirha"),
        ("Qala nge-over-the-counter ye-acne ephakinti", "Qala nge-acne engaphandle kwegqirha ephakathi"),
        ("Qala nge-over-the-counter ye-acne ephakathi", "Qala nge-acne engaphandle kwegqirha ephakathi"),
        ("Kwi-counter-the-counter paracetamol", "I-paracetamol engaphandle kwegqirha"),
        ("Kwi-counter-the-counter benzoyl peroxide", "I-benzoyl peroxide engaphandle kwegqirha"),
        ("i-retinoid creams", "iikhrimu ze-retinoid"),
        ("kwi-skincare", "ngokunakekela ulusu"),
        ("yithi 'heart attack'", "yithi 'uhlaselo lwentliziyo'"),
        ("ngokwemiqathango ecacileyo", "ngamazwi alula"),
        ("ngamazwi acacileyo", "ngamazwi alula"),
    ],
    "zu": [
        ("What it is", "Kuyini"),
        ("In plain terms", "Ngamazwi alula"),
        ("What you might notice", "Izimpawu ongazibona"),
        ("Four things worth knowing", "Izinto ezine okufanele uzazi"),
        ("What is true and what is not", "Okuyiqiniso nokungeyona iqiniso"),
        ("Your next steps", "Izinyathelo zakho ezilandelayo"),
        ("What to do", "Okufanele ukwenze"),
        ("Where to go", "Lapho ongaya khona"),
        ("Get help", "Thola usizo"),
        ("Call now", "Shayela manje"),
        ("Talk to someone now", "Khuluma nomuntu manje"),
        ("See a clinic or hospital urgently if", "Yiya emtholampilo noma esibhedlela ngokushesha uma"),
        ("Red flags", "Izimpawu eziyingozi"),
        ("Danger signs", "Izimpawu eziyingozi"),
        ("Prevention", "Ukuvimbela"),
        ("Screening", "Ukuhlolwa"),
        ("Symptoms", "Izimpawu"),
        ("Treatment", "Ukwelashwa"),
        ("Diagnosis", "Ukuxilongwa"),
        ("Pending clinical review", "Ukubuyekezwa komtholampilo kulindile"),
        ("Ulwazi lwezempilo ongalethemba", "Ulwazi lwezempilo ongaluthemba"),
        ("Impilo isongela", "Izimo ezisongela impilo"),
        ("Isifo senhliziyo", "Ukuhlasela kwenhliziyo"),
        ("I-allergic enzima (i-anaphylaxis)", "Ukungezwani okukhulu komzimba (i-anaphylaxis)"),
        ("Impilo yengane nengane", "Impilo yezingane nezinsana"),
        ("Izifo zesikhumba fungal", "Izifo zesikhumba ezibangelwa ukhunta"),
        ("Siza umuntu okhwehlela", "Siza umuntu oklinywayo"),
        ("okhwehlelayo", "oklinywayo"),
        ("ongazuzwa", "ongaphenduli"),
        ("ishoqoka", "ukushaqeka"),
        ("Indlela yokuphatha ishoqoka", "Indlela yokuphatha ukushaqeka"),
        ("Ulwazi lwezokwelapha lwaseNingizimu Afrika", "Ulwazi lwezempilo lwaseNingizimu Afrika"),
        ("Ukuthintela ukukhulelwa", "Ukuvimbela inzalo"),
        (" in plain terms", " ngamazwi alula"),
        ("over-the-counter", "ngaphandle kwegqirha"),
        ("counter-the-counter", "ngaphandle kwegqirha"),
        ("phezu-the-counter", "ngaphandle kwegqirha"),
        ("Qala phezu-the-counter antifungal cream", "Qala ngekhrimu ye-antifungal engaphandle kwegqirha"),
        ("Qala nge-over-the-counter ukuze uthole izinduna ezithambile", "Qala ngokwelashwa kwangaphandle kwegqirha kwe-acne elithambile"),
    ],
    "st": [
        ("What it is", "Ke eng"),
        ("In plain terms", "Ka mantsoe a bonolo"),
        ("What you might notice", "Matšoao ao u ka a bonang"),
        ("Four things worth knowing", "Lintho tse nne tseo u lokelang ho li tseba"),
        ("What is true and what is not", "Seo e leng 'nete le seo e seng 'nete"),
        ("Your next steps", "Mehato ea hau e latelang"),
        ("What to do", "Seo u lokelang ho se etsa"),
        ("Where to go", "Moo u ka eang teng"),
        ("Get help", "Fumana thuso"),
        ("Call now", "Letsetsa hona joale"),
        ("Talk to someone now", "Bua le motho hona joale"),
        ("See a clinic or hospital urgently if", "E-ea tleliniking kapa sepetlele ka potlako haeba"),
        ("Red flags", "Matšoao a kotsi"),
        ("Danger signs", "Matšoao a kotsi"),
        ("Prevention", "Thibelo"),
        ("Screening", "Tlhahlobo"),
        ("Symptoms", "Matšoao"),
        ("Treatment", "Kalafo"),
        ("Diagnosis", "Tlhahlobo"),
        ("Pending clinical review", "Tlhahlobo ea bongaka e sa ntse e emetse"),
        ("Tlhahisoleseding ea bophelo bo botle eo u ka e tšepela.", "Tlhahisoleseding ea bophelo bo botle eo u ka e tšepang."),
        ("Sethoathoa", "Stroke / Setorouku"),
        ("Sekhukhune", "Lefu la tsoekere"),
        ("Lehodu", "Lefuba (TB)"),
        ("Sethoathoa sa asthma", "Tlhaselo ea asthma"),
        ("Ho tšoha", "Boemo ba shock"),
        ("di-airtime", "airtime"),
        ("over-the-counter", "ntle le lengolo la ngaka"),
        ("li-over-the-counter", "ntle le lengolo la ngaka"),
    ],
}

# Disease display names per slug (from approved glossary)
DISEASE_NAMES: dict[str, dict[str, str]] = {
    "cervical-cancer-hpv": {
        "af": "Servikale kanker en HPV",
        "xh": "Umhlaza womlomo wesibeleko ne-HPV",
        "zu": "Umdlavuza womlomo wesibeletho ne-HPV",
        "st": "Kankere ea molomo oa popelo le HPV",
    },
    "breast-cancer": {
        "af": "Borskanker en knoppe",
        "xh": "Umhlaza wamabele namaqhuma",
        "zu": "Umdlavuza webele nezigaxa",
        "st": "Kankere ea matsoele le maqhubu",
    },
    "pregnancy-danger-signs": {
        "af": "Gevaartekens tydens swangerskap",
        "xh": "Iimpawu eziyingozi zokukhulelwa",
        "zu": "Izimpawu eziyingozi zokukhulelwa",
        "st": "Matšoao a kotsi a bokhachane",
    },
    "contraception": {
        "af": "Voorbehoeding",
        "xh": "Ucwangciso-ntsapho",
        "zu": "Ukuvimbela inzalo",
        "st": "Thibela pelehi",
    },
    "child-fever": {
        "af": "Koors by 'n kind",
        "xh": "Ifiva yomntwana",
        "zu": "Umkhuhlane wengane",
        "st": "Feberu ea ngoana",
    },
    "childhood-diarrhoea": {
        "af": "Diarree by kinders",
        "xh": "Urhudo lwabantwana",
        "zu": "Uhudo lwezingane",
        "st": "Letšollo la bana",
    },
    "vaccinations": {
        "af": "Kinderinentings",
        "xh": "Izitofu zabantwana",
        "zu": "Ukugonywa kwezingane",
        "st": "Liente tsa bana",
    },
    "asthma-children": {
        "af": "Asma by kinders",
        "xh": "I-asthma ebantwaneni",
        "zu": "Isifuba somoya ezinganeni",
        "st": "Asthma ho bana",
    },
    "depression": {
        "af": "Depressie",
        "xh": "Ukudakumba (depression)",
        "zu": "Ukucindezeleka",
        "st": "Ho tepella maikutlo",
    },
    "anxiety": {
        "af": "Angs",
        "xh": "Uxhalaba",
        "zu": "Ukukhathazeka",
        "st": "Matšoenyeho",
    },
    "substance-use": {
        "af": "Middelgebruik en verslawing",
        "xh": "Ukusetyenziswa gwenxa kweziyobisi nokuxhomekeka",
        "zu": "Ukusetshenziswa kwezidakamizwa nokulutheka",
        "st": "Tšebeliso e mpe ea lithethefatsi le ho lemalla",
    },
    "diabetes": {
        "af": "Diabetes",
        "xh": "Iswekile",
        "zu": "Isifo sikashukela",
        "st": "Lefu la tsoekere",
    },
    "high-blood-pressure": {
        "af": "Hoë bloeddruk",
        "xh": "Uxinzelelo lwegazi oluphezulu",
        "zu": "Umfutho wegazi ophezulu",
        "st": "Khatello e phahameng ea mali",
    },
    "high-cholesterol": {
        "af": "Hoë cholesterol",
        "xh": "I-cholesterol ephezulu",
        "zu": "I-cholesterol ephezulu",
        "st": "K'holeseterole e phahameng",
    },
    "stroke": {
        "af": "Beroerte",
        "xh": "Istrowuku",
        "zu": "Isifo sohlangothi",
        "st": "Stroke / Setorouku",
    },
    "heart-attack": {
        "af": "Hartaanval",
        "xh": "Uhlaselo lwentliziyo",
        "zu": "Ukuhlasela kwenhliziyo",
        "st": "Tlhaselo ea pelo",
    },
    "severe-allergic-reaction": {
        "af": "Ernstige allergiese reaksie",
        "xh": "Ukusabela okukhulu kwe-allergy (i-anaphylaxis)",
        "zu": "Ukungezwani okukhulu komzimba (i-anaphylaxis)",
        "st": "Karabelo e matla ea ho kula (anaphylaxis)",
    },
    "asthma-attack": {
        "af": "Asma-aanval",
        "xh": "Uhlaselo lwe-asthma",
        "zu": "Ukuhlasela kwesifuba somoya",
        "st": "Tlhaselo ea asthma",
    },
    "meningitis": {
        "af": "Meningitis",
        "xh": "I-meningitis",
        "zu": "I-meningitis",
        "st": "Meningitis",
    },
    "fungal-skin": {
        "af": "Swamvelinfeksies",
        "xh": "Izifo zolusu ezibangelwa yifungus",
        "zu": "Izifo zesikhumba ezibangelwa ukhunta",
        "st": "Mafu a letlalo a bakoang ke fungus",
    },
    "headache-migraine": {
        "af": "Hoofpyn en migraine",
        "xh": "Intloko ebuhlungu ne-migraine",
        "zu": "Ikhanda elibuhlungu ne-migraine",
        "st": "Hlooho e bohloko le hlooho e opang (Migraine)",
    },
    "heartburn-reflux": {
        "af": "Sooibrand en refluks",
        "xh": "Ukutsha kwesifuba ne-acid reflux",
        "zu": "Isilungulela ne-reflux",
        "st": "Pelo e chesa le asiti e nyolohelang (Acid reflux)",
    },
    "uti": {
        "af": "Urienweginfeksie (UTI)",
        "xh": "Usulelo lomchamo (UTI)",
        "zu": "Ukutheleleka komgudu womchamo (UTI)",
        "st": "Tšoaetso ea moroto (UTI)",
    },
    "prostate-problems": {
        "af": "Prostaatprobleme",
        "xh": "Iingxaki ze-prostate",
        "zu": "Izinkinga zendlala yesinye",
        "st": "Mathata a tšoelesa ea senyama (Prostate)",
    },
    "flu": {
        "af": "Griep",
        "xh": "Umkhuhlane (influenza)",
        "zu": "Umkhuhlane (influenza)",
        "st": "Ntaramane (Flu)",
    },
    "pneumonia": {
        "af": "Longontsteking",
        "xh": "Inyumoniya",
        "zu": "Inyumoniya",
        "st": "Nyumonia",
    },
    "tb": {
        "af": "TB",
        "xh": "I-TB (isifo sephepha)",
        "zu": "I-TB (Tuberculosis)",
        "st": "Lefuba (TB)",
    },
}


def walk_replace(obj, replacements: list[tuple[str, str]]):
    if isinstance(obj, dict):
        return {k: walk_replace(v, replacements) for k, v in obj.items()}
    if isinstance(obj, list):
        return [walk_replace(v, replacements) for v in obj]
    if isinstance(obj, str):
        s = obj
        for old, new in replacements:
            s = s.replace(old, new)
        return s
    return obj


def process_disease_files() -> tuple[int, int]:
    files_changed = 0
    replacement_count = 0
    for loc in ("af", "xh", "zu", "st"):
        reps = HEADING_REPLACEMENTS[loc]
        for path in sorted(DISEASES.glob(f"*.{loc}.json")):
            slug = path.stem.replace(f".{loc}", "")
            before = path.read_text(encoding="utf-8")
            data = json.loads(before)
            data = walk_replace(data, reps)
            if slug in DISEASE_NAMES and loc in DISEASE_NAMES[slug]:
                data["name"] = DISEASE_NAMES[slug][loc]
            after = json.dumps(data, ensure_ascii=False, indent=2) + "\n"
            if before != after:
                path.write_text(after, encoding="utf-8")
                files_changed += 1
                for old, _ in reps:
                    replacement_count += before.count(old)
    return files_changed, replacement_count


def process_catalog() -> int:
    cat = json.loads(CATALOG.read_text(encoding="utf-8"))
    changed = 0
    for slug, names in DISEASE_NAMES.items():
        if slug not in cat["diseases"]:
            continue
        for loc, name in names.items():
            if loc in cat["diseases"][slug]:
                if cat["diseases"][slug][loc]["name"] != name:
                    cat["diseases"][slug][loc]["name"] = name
                    changed += 1
    # child-fever AF catalog name
    if cat["diseases"]["child-fever"]["af"]["name"] != "Koors by 'n kind":
        cat["diseases"]["child-fever"]["af"]["name"] = "Koors by 'n kind"
        changed += 1
    if cat["diseases"]["pregnancy-danger-signs"]["af"]["name"] != "Gevaartekens tydens swangerskap":
        cat["diseases"]["pregnancy-danger-signs"]["af"]["name"] = "Gevaartekens tydens swangerskap"
        changed += 1
    if cat["diseases"]["stroke"]["xh"]["name"] != "Istrowuku":
        cat["diseases"]["stroke"]["xh"]["name"] = "Istrowuku"
        changed += 1
    CATALOG.write_text(json.dumps(cat, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    return changed


def validate_json_files() -> list[str]:
    errors = []
    for path in sorted(DISEASES.glob("*.json")):
        try:
            json.loads(path.read_text(encoding="utf-8"))
        except json.JSONDecodeError as e:
            errors.append(f"{path.name}: {e}")
    try:
        json.loads(CATALOG.read_text(encoding="utf-8"))
    except json.JSONDecodeError as e:
        errors.append(f"catalog-translations.json: {e}")
    return errors


def main():
    fc, rc = process_disease_files()
    cc = process_catalog()
    errors = validate_json_files()
    print(f"Disease files changed: {fc}")
    print(f"Approx replacements: {rc}")
    print(f"Catalog name updates: {cc}")
    if errors:
        print("JSON ERRORS:")
        for e in errors:
            print(f"  {e}")
    else:
        print("All JSON files valid.")


if __name__ == "__main__":
    main()
