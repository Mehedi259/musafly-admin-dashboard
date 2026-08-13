import os

filepath = '/Users/mehedihasanmridul/website/musafly-admin-dashboard/src/components/Sidebar.tsx'
with open(filepath, 'r') as f:
    content = f.read()

content = content.replace(
    '<h1 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#5B9BD5] to-[#F4B942]">\n          MusaFly Admin\n        </h1>',
    '<Link href="/"><h1 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#5B9BD5] to-[#F4B942]">\n          MusaFly Admin\n        </h1></Link>'
)

content = content.replace(
    '<h1 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#5B9BD5] to-[#F4B942]">\n            MusaFly Admin\n          </h1>',
    '<Link href="/"><h1 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#5B9BD5] to-[#F4B942]">\n            MusaFly Admin\n          </h1></Link>'
)

with open(filepath, 'w') as f:
    f.write(content)

