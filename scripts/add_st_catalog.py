#!/usr/bin/env python3
"""Add Sesotho catalog entries with approved names."""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CATALOG = ROOT / "src" / "data" / "catalog-translations.json"

ST_GROUPS = {
    "emergency-signs": {
        "name": "Maemo a kotsi bophelong",
        "tagline": "Ithute seo u lokelang ho se etsa metsotso e qalang.",
    },
    "chronic-lifestyle": {
        "name": "Mafu a sa foleng a tloaelehileng a bophelo",
        "tagline": "Maemo a nako e telele ao u ka a laolang.",
    },
    "infectious": {
        "name": "Mafu a tšoaetsanoang",
        "tagline": "Se tšoaetsanang, mokhoa oa ho itšireletsa.",
    },
    "womens-health": {
        "name": "Bophelo bo botle ba basali",
        "tagline": "Tlhokomelo ho mehato eohle ea bophelo.",
    },
    "mens-health": {
        "name": "Bophelo bo botle ba banna",
        "tagline": "Seo banna ba sa botseng ka teng haholo.",
    },
    "child-baby": {
        "name": "Bophelo bo botle ba bana le masea",
        "tagline": "Nako ea ho tšoenyehisa le nako ea ho emela.",
    },
    "mental-health": {
        "name": "Bophelo bo botle ba kelello",
        "tagline": "Ha u a ikotla u le u le mong. Thuso e teng.",
    },
    "skin-allergy": {
        "name": "Letlalo le mafu a allergy",
        "tagline": "A tloaelehileng, a ka alofaloang, hangata a hlalosoe hlole.",
    },
    "pain-everyday": {
        "name": "Bohloko le mathata a letsatsi le letsatsi",
        "tagline": "Litlhoko tseo u li tlisang khemising.",
    },
    "prevention-screening": {
        "name": "Thibelo le tlhahlobo",
        "tagline": "E tšoare ka pele. Lula u le pele.",
    },
}

ST_DISEASES = {
    "stroke": ("Stroke / Setorouku", "Matšoao a FAST. Motsotso o mong le o mong o bohlokoa."),
    "heart-attack": ("Tlhaselo ea pelo", "Bohloko ba sefubeng bo sa feleng — letsetsa hona joale."),
    "severe-allergic-reaction": ("Karabelo e matla ea ho kula (anaphylaxis)", "Ho opa, mathata a ho phefumula — tšohanyetso."),
    "asthma-attack": ("Tlhaselo ea asthma", "Ho fe fefo ho sa feleng — nka mehato ka potlako."),
    "meningitis": ("Meningitis", "Ho opa, bohloko ba hlooho, matšoao a kotsi — sepetlele hang-hang."),
    "high-blood-pressure": ("Khatello e phahameng ea mali", "E bolaea ka ho khutsitsa. Lekola mali ea hau."),
    "diabetes": ("Lefu la tsoekere", "Laoloa ka ho ja, ho tsamaea le meriana."),
    "high-cholesterol": ("K'holeseterole e phahameng", "Ha e bonahale. Lekola ka tlhahlobo."),
    "hiv": ("HIV", "E tšoaretsoe. Phela bophelo bo botle ka kalafo."),
    "tb": ("Lefuba (TB)", "Ho khokhola libeke tse 2+? Hlahloba kajeno — kalafo ea mahala."),
    "stis": ("Mafu a tšoaetsanoang ka thobalano (STIs)", "A tloaelehileng, a ka alofaloang — hlahloba."),
    "flu": ("Ntaramane (Flu)", "Nako ea ho phomola. Nako ea ho letsetsa ngaka."),
    "covid-19": ("COVID-19", "Matšoao, ho itšireletsa le nako ea ho fumana thuso."),
    "pneumonia": ("Nyumonia", "Ho khokhola, ho futhumala, ho phefumoloha ho thata."),
    "cervical-cancer-hpv": ("Kankere ea molomo oa popelo le HPV", "Tlhahlobo e bolokang bophelo. Qala kajeno."),
    "breast-cancer": ("Kankere ea matsoele le maqhubu", "Ibona le ho ipapa. Tseba matšoao."),
    "pregnancy-danger-signs": ("Matšoao a kotsi a bokhachane", "Ha u belaela — sepetlele hang-hang."),
    "contraception": ("Thibela pelehi", "Likhetho tsa hau. Se mahala. Se loketseng bophelo ba hau."),
    "prostate-problems": ("Mathata a tšoelesa ea senyama (Prostate)", "A tloaelehileng kamora lilemo tse 50."),
    "childhood-diarrhoea": ("Letšollo la bana", "Amanzi le ORS. Tseba nako ea kotsi."),
    "child-fever": ("Feberu ea ngoana", "Nako ea ho tšoenyehisa le nako ea ho ea tleliniking."),
    "vaccinations": ("Liente tsa bana", "Moralo oa mahala oa SA. Liente tsohle li bohlokoa."),
    "asthma-children": ("Asthma ho bana", "Laola ho tloha bonyane. Tseba matšoao a kotsi."),
    "depression": ("Ho tepella maikutlo", "Ke 'nete. Ke tloaelehileng. E ka alofaloang."),
    "anxiety": ("Matšoenyeho", "Ho feta ho tšoenyehisa feela. Ho na le mekhoa e thusang."),
    "substance-use": ("Tšebeliso e mpe ea lithethefatsi le ho lemalla", "Thuso e teng. U sa le u le mong."),
    "acne": ("Acne", "E sebetsa. Se e etsang hore e be boholo."),
    "eczema": ("Eczema", "Li-trigger le mokhoa oa ho khaola ho khahleha."),
    "fungal-skin": ("Mafu a letlalo a bakoang ke fungus", "Ringworm, lieta tsa bapalami — bonolo ho alola."),
    "headache-migraine": ("Hlooho e bohloko le hlooho e opang (Migraine)", "Nako ea ho phomola le nako ea ho tšoenyehisa."),
    "heartburn-reflux": ("Pelo e chesa le asiti e nyolohelang (Acid reflux)", "Ho fetoha ha mefuta ea ho ja le meriana."),
    "uti": ("Tšoaetso ea moroto (UTI)", "Ho utloa ho teng ha ho phepeloa metsi — fumana kalafo."),
}


def main():
    catalog = json.loads(CATALOG.read_text(encoding="utf-8"))
    for slug, data in ST_GROUPS.items():
        catalog["groups"].setdefault(slug, {})["st"] = data
    for slug, (name, tagline) in ST_DISEASES.items():
        catalog["diseases"].setdefault(slug, {})["st"] = {"name": name, "tagline": tagline}
    CATALOG.write_text(json.dumps(catalog, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Added st entries: {len(ST_GROUPS)} groups, {len(ST_DISEASES)} diseases")


if __name__ == "__main__":
    main()
