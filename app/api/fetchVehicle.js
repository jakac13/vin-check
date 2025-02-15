import axios from 'axios';
import testData from '../../assets/testData.json'

/* export async function fetchVehicle(vin) {
    const response = await axios.get(`https://api-aw46ycnrva-ey.a.run.app/api/v0/vehicles?vin=${vin}`);
    return response.data;
} */

//const testData = [{"vin": "vf1rfb00557744840", "katgorija": "m1", "znamka": "renault", "model_simple": "megane", "model_detail": "megane / grandtour 1.2 / 16v", "drzava_izvora": "francija", "gorivo": "bencin", "motor_moc": 97.0, "motor_v": 1197.0, "masa": 1368.0, "barva_simple": "siva", "barva_detail": "kovinski - siva - svetla", "prva_registracija": "2017-04-12", "prva_registracija_slo": "2017-04-12", "prva_registracija_obmocje": "celje", "prva_registracija_leto": 2017, "prva_registracija_slo_leto": 2017, "prva_registracija_mesec": 4, "prva_registracija_slo_mesec": 4, "km": 42501.0, "uporabnik_p_f": "f", "lastnik_p_f": "f", "uporabnik_je_lastnik": 1, "lastnik_starost": 70, "uporabnik_starost": 70, "uporabnik_spol": "m", "uporabnik_obcina": "celje", "uporabnik_regija": "savinjska", "teh_pregled_status": null, "teh_pregled_izv_enota": null, "uvozeno": 0, "warn_teh_pregled": 0, "aktivnost": [2022, 2021, 2020, 2019, 2018, 2017], "his": {"km": {"2022": 42501.0, "2021": 42501.0}, "uporabnik_p_f": {"2022": "f", "2021": "f", "2020": "f", "2019": "f", "2018": "f", "2017": "f"}, "lastnik_p_f": {"2022": "f", "2021": "f", "2020": "f", "2019": "f", "2018": "f", "2017": "f"}, "uporabnik_je_lastnik": {"2022": 1, "2021": 1, "2020": 1, "2019": 1, "2018": 1, "2017": 1}, "lastnik_starost": {"2022": 70, "2021": 69, "2020": 68, "2019": 67, "2018": 66, "2017": 65}, "uporabnik_starost": {"2022": 70, "2021": 69, "2020": 68, "2019": 67, "2018": 66, "2017": 65}, "uporabnik_spol": {"2022": "m", "2021": "m", "2020": "m", "2019": "m", "2018": "m", "2017": "m"}, "uporabnik_obcina": {"2022": "celje", "2021": "celje", "2020": "celje", "2019": "celje", "2018": "celje", "2017": "celje"}, "uporabnik_regija": {"2022": "savinjska", "2021": "savinjska", "2020": "savinjska", "2019": "savinjska", "2018": "savinjska", "2017": "savinjska"}, "teh_pregled_status": {"2021": "pogojno brezhiben", "2017": "brezhiben"}, "teh_pregled_izv_enota": {"2021": "stajerski avto dom d.o.o.", "2017": "stajerski avto dom d.o.o."}}, "razpon_km": "+10000", "prevrteni_km": 1, "warn_km": 1}]

export async function fetchVehicle(vin) {
  await new Promise(resolve => setTimeout(resolve, 1000));
  const vehicle = testData.find(vehicle => vehicle.vin === vin);

  return vehicle ? vehicle : null;
}