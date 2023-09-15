import React from "react";

export default function Info(params) {
    

    return (
        <div className="w-100 h-100 flex justify-center items-center overflow-scroll">
            <div className="px-5 w-3/4 py-3 bg-gray-200 mt-10">
                <h1 className="text-5xl font-bold mb-5">KABUL VE KISITLAR</h1>
                <li className="py-2">Bir doktordan(veya herhangi bir randevu veren iş kolu bu gruba dahil edilebilir) bir saat için randevu alınması isteniyorsa ilgili tarih ve saate dair randevu isteği açılmalı ve doktorun da bu randevu talebini onaylaması gereklidir.</li>
                <li className="py-2">Onaylanmadan bekleyen randevu talepleri kabul edilmeden ilgili kullanıcı o randevuyu almış olarak belirtilmez.</li>
                <li className="py-2">Doktorun randevu isteğine verdiği cevap kesindir, geri alınamaz.</li>
                <li className="py-2">Doktor randevu isteğine verdiği cevabı geri alamamasına rağmen randevudan 1 gün öncesine kadar randevuyu iptal etme hakkına sahiptir</li>
                <li className="py-2">Kullanıcılar eğer doktora gönderdikleri randevu talebinden "ret" cevabı alırsa aynı gün ve saat için başka bir randevu isteği daha gönderemez. (Örn: 12/08/2023 09:00 için istenilen randevu ret yerse hemen ardından bir daha 12/08/2023 09:00 için istek atılamaz.)</li>
                <li className="py-2">Randevu isteği "ret" olarak cevaplanan kullanıcılar eğer başka bir kullanıcı da o tarih ve saatte "ret" cevabı alırsa ancak o zaman randevu isteği gönderme hakkına sahip olur.</li>
                <li className="py-2">Takvimler doktorlara göredir doktorların müsaitlik durumları tablolarda işaretlenmiştir(müsait, değil gibi).</li>
                <li className="py-2">Takvimlerdeki renkler doktorların müsaitlik durumlarını belirttiği gibi doktora öbür kullanıcılar tarafından gönderilen isteklerle de ilişkilidir. Örneğin, A kullanıcısı bir doktordan randevu aldığında veya randevu isteği yolladığında B kullanıcısına bu durum kırmızı olarak görünür ve B kullanıcısı o tarih ve saat için istek atamaz.</li>
                <li className="py-2">Doktorun kendi müsaitlik durumu söz konusu olduğundan ötürü doktor kendi paneli üzerinden bir isteği reddettiğinde ilgili tarihteki saat bloğu kırmızı olarak değil renksiz olarak yani "müsait" olarak işaretlenir. Bu durum doktorun kendine göre müsaitliğini veya meşguliyetini görmesine yardımcı olur.</li>
            </div>
        </div>
    );
}