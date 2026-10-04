# Resend afzenderdomein

**Bewaarde configuratie, 4 oktober 2026:** de website is teruggezet naar de eerdere versie. De Resend-funnel is uit de applicatie verwijderd; deze DNS-informatie is alleen een archief van de eerder ingerichte externe resource. Er is bij de terugzetting geen DNS-wijziging of nieuwe afzenderverificatie uitgevoerd.

Domein: **mail.mediadustry.com**. Regio: EU (Ierland). Aangemaakt op 4 oktober 2026.

Voeg onderstaande records toe bij de huidige DNS-beheerder van mediadustry.com. Nameservers: webhostingserver.g1-dns.com en webhostingserver.g1-dns.one. Gebruik in een DNS-paneel dat de domeinnaam automatisch toevoegt alleen de relatieve naam. TTL: standaard/automatisch.

| Type | Volledige naam                          | Waarde                                                                                                                                                                                                                     | Prioriteit |
| ---- | --------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| TXT  | resend.\_domainkey.mail.mediadustry.com | p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDAQE1fwvc4t2XeiO1cYVA4gQC+y4toVCEHZasYmqm6H2XhuL+2XPwsVWIeONxlBd24e8IZ/gV4KgYCkTzeysXEk14RuF9DsnkBDEwrAiOL77JGR92I16Fe/x/xDo6w1AeC1IERVTC45bq8bgNRFa2eVk8WwX1WZqbmUT4bXhgUNQIDAQAB | —          |
| MX   | send.mail.mediadustry.com               | feedback-smtp.eu-west-1.amazonses.com                                                                                                                                                                                      | 10         |
| TXT  | send.mail.mediadustry.com               | v=spf1 include:amazonses.com ~all                                                                                                                                                                                          | —          |

Deze records staan op het verzendsubdomein. Laat de bestaande Microsoft 365 MX-, SPF- en DMARC-records van mediadustry.com staan. Nadat DNS zichtbaar is, start verificatie in de gekoppelde Resend-resource en stel CONTACT_FROM_EMAIL in op MEDIADUSTRY <info@mail.mediadustry.com>.
