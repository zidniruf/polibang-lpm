<x-filament-widgets::widget>
    <x-filament::section style="height: 100%;">
        <x-slot name="heading">
            Aksi Cepat
        </x-slot>

        <div style="display: flex; flex-direction: column; justify-content: space-between; min-height: 280px; height: 100%;">

            <a href="{{ url('/admin/news/create') }}"
               style="display: flex; align-items: center; justify-content: center; width: 100%; padding: 12px 16px; border-radius: 12px; background-color: #fff7ed; color: #ea580c; font-weight: 600; font-size: 14px; text-decoration: none; transition: opacity 0.2s;"
               onmouseover="this.style.opacity='0.8'" 
               onmouseout="this.style.opacity='1'">
                <span style="margin-right: 8px; font-size: 18px; line-height: 1;">+</span> Tambah Berita
            </a>

            <a href="{{ url('/admin/galleries/create') }}"
               style="display: flex; align-items: center; justify-content: center; width: 100%; padding: 12px 16px; border-radius: 12px; background-color: #eef2ff; color: #4f46e5; font-weight: 600; font-size: 14px; text-decoration: none; transition: opacity 0.2s;"
               onmouseover="this.style.opacity='0.8'" 
               onmouseout="this.style.opacity='1'">
                <span style="margin-right: 8px; font-size: 18px; line-height: 1;">+</span> Tambah Galeri
            </a>

            <a href="{{ url('/admin/documents/create') }}"
               style="display: flex; align-items: center; justify-content: center; width: 100%; padding: 12px 16px; border-radius: 12px; background-color: #fefce8; color: #ca8a04; font-weight: 600; font-size: 14px; text-decoration: none; transition: opacity 0.2s;"
               onmouseover="this.style.opacity='0.8'" 
               onmouseout="this.style.opacity='1'">
                <span style="margin-right: 8px; font-size: 18px; line-height: 1;">+</span> Tambah Dokumen
            </a>

            <a href="{{ url('/admin/announcements/create') }}"
               style="display: flex; align-items: center; justify-content: center; width: 100%; padding: 12px 16px; border-radius: 12px; background-color: #fdf2f8; color: #db2777; font-weight: 600; font-size: 14px; text-decoration: none; transition: opacity 0.2s;"
               onmouseover="this.style.opacity='0.8'" 
               onmouseout="this.style.opacity='1'">
                <span style="margin-right: 8px; font-size: 18px; line-height: 1;">+</span> Tambah Pengumuman
            </a>

        </div>
    </x-filament::section>
</x-filament-widgets::widget>