/** Medical-themed photos — work well in circular crops (no faces) */
const U = (id: string) =>
  `https://images.unsplash.com/${id}?w=300&q=80&auto=format&fit=crop&crop=entropy`;

export const SPECIALTY_IMAGES: Record<string, string> = {
  obgyn:             U("photo-1579684385127-1ef15a508118"),
  urology:           U("photo-1582719478250-c89cae4dc85b"),
  dermatology:       U("photo-1570172619644-dfd03ed5d881"),
  psychiatry:        U("photo-1505751172876-fa1923c5c528"),
  pediatrics:        U("photo-1584515933497-464c5eb0c770"),
  ophthalmology:     U("photo-1579684385127-1ef15a508118"),
  orthopedics:       U("photo-1559757175-0eb30cd8c063"),
  internal_cardio:   U("photo-1628348068343-c6a848d2b6dd"),
  neurosurgery:      U("photo-1551190822-a9333d879b1f"),
  general_surgery:   U("photo-1579684385127-1ef15a508118"),
  ent:               U("photo-1576091160550-2173dba999ef"),
  dentistry:         U("photo-1606811841689-23dfddce3e95"),
  ultrasound_xray:   U("photo-1516549655169-dff870e62727"),
  wound_care:        U("photo-1579684385127-1ef15a508118"),
  physiotherapy:     U("photo-1571019614242-c5c5dee9f50b"),
  audiology:         U("photo-1596464716127-f177a2ec7ad8"),
  pharmacies:        U("photo-1584308666744-24d5c474f2ae"),
  labs:              U("photo-1576086213369-fb9929c4470b"),
  medical_complexes: U("photo-1576091160399-112ba8d25d1d"),
};

export function specialtyImage(key: string): string {
  return SPECIALTY_IMAGES[key] ?? U("photo-1576091160399-112ba8d25d1d");
}
