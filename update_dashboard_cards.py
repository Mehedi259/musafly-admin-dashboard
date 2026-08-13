import os

filepath = '/Users/mehedihasanmridul/website/musafly-admin-dashboard/src/app/(dashboard)/page.tsx'
with open(filepath, 'r') as f:
    content = f.read()

# Add Link import
if "import Link from 'next/link';" not in content:
    content = content.replace("import axios from 'axios';", "import axios from 'axios';\nimport Link from 'next/link';")

# Add hrefs to stats
content = content.replace(
    'const stats = [\n    { label: "Total Tours", value: counts.tours, color: "from-blue-500 to-cyan-400" },',
    'const stats = [\n    { label: "Total Tours", value: counts.tours, color: "from-blue-500 to-cyan-400", href: "/tours" },'
)
content = content.replace(
    '{ label: "Total Flights", value: counts.flights, color: "from-purple-500 to-pink-500" },',
    '{ label: "Total Flights", value: counts.flights, color: "from-purple-500 to-pink-500", href: "/flights" },'
)
content = content.replace(
    '{ label: "Total Visas", value: counts.visas, color: "from-amber-400 to-orange-500" },',
    '{ label: "Total Visas", value: counts.visas, color: "from-amber-400 to-orange-500", href: "/visas" },'
)
content = content.replace(
    '{ label: "Umrah Packages", value: counts.umrah, color: "from-emerald-400 to-teal-500" },',
    '{ label: "Umrah Packages", value: counts.umrah, color: "from-emerald-400 to-teal-500", href: "/umrah" },'
)
content = content.replace(
    '{ label: "Customer Ratings", value: counts.testimonials, color: "from-indigo-400 to-purple-500" },',
    '{ label: "Customer Ratings", value: counts.testimonials, color: "from-indigo-400 to-purple-500", href: "/testimonials" },'
)
content = content.replace(
    '{ label: "FAQs", value: counts.faqs, color: "from-rose-400 to-red-500" }',
    '{ label: "FAQs", value: counts.faqs, color: "from-rose-400 to-red-500", href: "/faqs" }'
)

# Update map
content = content.replace(
    '<div key={i} className="bg-[#1a1d24] border border-[#2e3340] p-6 rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all">',
    '<Link href={stat.href} key={i} className="bg-[#1a1d24] border border-[#2e3340] p-6 rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 hover:border-[#F4B942]/50 transition-all block cursor-pointer">'
)
content = content.replace(
    '</div>\n        ))}  ',
    '</Link>\n        ))}  '
)
# Ensure the closing div in the map is replaced by Link closing
lines = content.split('\n')
for i in range(len(lines)):
    if '<Link href={stat.href}' in lines[i]:
        # we found the start of Link. the end is after stat.value
        # it was: </div>\n        ))}
        pass
content = content.replace(
    '            </div>\n          </div>',
    '            </div>\n          </Link>'
)

with open(filepath, 'w') as f:
    f.write(content)
