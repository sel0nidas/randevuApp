# randevuApp

RandevuApp kullanıcıların randevu alıp verebildiği bir platformdur. Bu Repo ilgili uygulamanın frontend dosyalarını içermektedir. Backend dosyalarını görmek için kullanıcı sayfam üzerinden "randevuAppBackend" isimli repo'ya bakabilirsiniz.

## Kullanılan Teknolojiler
- Backend --> .NET Core v2 Web API
- Frontend --> React.js
- Kullanılan Frontend kütüphaneleri --> "eser miktarda" MaterialUI😄 , Tailwind, Bootstrap(sadece grid yapısının kullanıldığı bazı noktalarda kullanılmıştır).


## Use Case(Kullanım Senaryosu) Kısıtları (Değişebilir)
- Bir doktordan(veya herhangi bir randevu veren iş kolu bu gruba dahil edilebilir) bir saat için randevu alınması isteniyorsa ilgili tarih ve saate dair randevu isteği açılmalı ve doktorun da bu randevu talebini onaylaması gereklidir.
- Onaylanmadan bekleyen randevu talepleri kabul edilmeden ilgili kullanıcı o randevuyu almış olarak belirtilmez.
- Doktorun randevu isteğine verdiği cevap kesindir, geri alınamaz.
- Doktorun randevu isteğine verdiği cevap "kabul" ise ilgili kullanıcının randevusunu iptal etme hakkı bulunur.
- Kullanıcılar eğer doktora gönderdikleri randevu talebinden "ret" cevabı alırsa aynı gün ve saat için başka bir randevu isteği gönderemez. (Örn: 12/08/2023 09:00 için istenilen randevu ret yerse bir daha 12/08/2023 09:00 için istek atılamaz.)
- Kullanıcı iptal ettiği anda ilgili randevu gün ve saatine dair olan hakkını kaybeder.
- Kullanıcılar her gün için sadece 1 randevu talebinde bulunabilir.
- Kullanıcılar randevu talebi gönderdikleri veya onay aldıkları vs. tarihlere başka doktor dahi olsa kesinlikle istek dahi gönderemezler.
- Takvimler doktorlara göredir doktorların müsaitlik durumları tablolarda işaretlenmiştir(müsait, değil gibi).
- Takvimlerdeki renkler doktorların müsaitlik durumlarını belirttiği gibi doktora öbür kullanıcılar tarafından gönderilen isteklerle de ilişkilidir. Örneğin, A kullanıcısı bir doktordan randevu aldığında veya randevu isteği yolladığında B kullanıcısına bu durum kırmızı olarak görünür ve B kullanıcısı o tarih ve saat için istek atamaz.
- Doktorun kendi müsaitlik durumu söz konusu olduğundan ötürü doktor kendi paneli üzerinden bir isteği reddettiğinde ilgili tarihteki saat bloğu kırmızı olarak değil renksiz olarak yani "müsait" olarak işaretlenir. Bu durum doktorun kendine göre müsaitliğini veya meşguliyetini görmesine yardımcı olur.

## Dipnot
- RandevuApp'in işlevselliğini anlatırken kullanılan örnekler genel anlamda doktor üzerinden verilmiş olmasına rağmen sistem genel olarak randevu ihtiyaçları için tasarlanmıştır. Sistem tasarlanırken bu şekilde tasarlanmıştır. Doktor olarak ifade edilen kısma herhangi bir randevu veren iş kolu bu gruba dahil edilebilir.

## Eklenebilecekler
- Doktor/Randevu Veren seçiminde kategorizasyon kısmı eklenebilir, bu sayede kullanıcıların kendilerinin ihtiyaçlarına özel doktorlar da daha rahat seçilmiş olur.
- UI üzerinde randevu alıp verme işlemi öncesi ve sonrası için UI ilgili kullanıcı hakkında daha detaylı bir bilgilendirme ekranı sunabilir. Örneğin, randevu alan kullanıcının cinsiyet, isim vb. genel özelliklerinin doktor tarafından görülmesi veya hastanın doktora randevu talebini iletirken not bırakması gibi.
