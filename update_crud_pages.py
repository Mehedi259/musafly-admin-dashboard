import os
import re

pages = [
    'tours/page.tsx',
    'flights/page.tsx',
    'visas/page.tsx',
    'umrah/page.tsx',
    'testimonials/page.tsx',
    'faqs/page.tsx'
]

base_dir = '/Users/mehedihasanmridul/website/musafly-admin-dashboard/src/app/(dashboard)'

for page in pages:
    path = os.path.join(base_dir, page)
    with open(path, 'r') as f:
        content = f.read()

    # 1. Update lucide-react import to include X
    content = re.sub(
        r"import { (.*?) } from 'lucide-react';",
        lambda m: f"import {{ {m.group(1)}{', X' if 'X' not in m.group(1) else ''} }} from 'lucide-react';",
        content
    )

    # 2. Add isFormVisible state
    if 'const [isFormVisible, setIsFormVisible] = useState(false);' not in content:
        content = re.sub(
            r"(const \[loading, setLoading\] = useState\(false\);)",
            r"\1\n  const [isFormVisible, setIsFormVisible] = useState(false);",
            content
        )

    # 3. Add closing form visibility in handleSubmit
    if 'setIsFormVisible(false);' not in content:
        content = re.sub(
            r"(fetchData\(\);\n    } catch \(err\) {)",
            r"fetchData();\n      setIsFormVisible(false);\n    } catch (err) {",
            content
        )

    # 4. Modify the header and add the button
    # Get the entity name from the heading: <h1 className="text-4xl font-bold text-white mb-8">Manage Tours</h1>
    entity_match = re.search(r'<h1[^>]*>Manage (.*?)</h1>', content)
    if entity_match:
        entity = entity_match.group(1)
        # singular entity roughly
        singular = entity[:-1] if entity.endswith('s') else entity

        old_header = f'<h1 className="text-4xl font-bold text-white mb-8">Manage {entity}</h1>'
        new_header = f'''<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h1 className="text-4xl font-bold text-white">Manage {entity}</h1>
        <button type="button" onClick={{() => setIsFormVisible(!isFormVisible)}} className="flex items-center gap-2 px-4 py-2 bg-[#252932] hover:bg-[#2e3340] text-white rounded-xl transition-all border border-[#2e3340] shadow-sm">
          {{isFormVisible ? <X size={{20}} className="text-red-400" /> : <Plus size={{20}} className="text-[#F4B942]" />}}
          <span className="font-semibold">{{isFormVisible ? 'Cancel' : 'Add New {singular}'}}</span>
        </button>
      </div>'''
        content = content.replace(old_header, new_header)

    # 5. Wrap the form div
    # The form div starts with: <div className="bg-[#1a1d24] border border-[#2e3340] rounded-2xl shadow-xl mb-8 overflow-hidden">
    # and ends right before: <div className="bg-[#1a1d24] border border-[#2e3340] rounded-2xl shadow-xl overflow-hidden"> (the table div)
    
    # We will just replace the exact start of the form div
    old_form_start = '<div className="bg-[#1a1d24] border border-[#2e3340] rounded-2xl shadow-xl mb-8 overflow-hidden">'
    new_form_start = '{isFormVisible && (\n      <div className="bg-[#1a1d24] border border-[#2e3340] rounded-2xl shadow-xl mb-8 overflow-hidden animate-in slide-in-from-top-4 duration-300">'
    content = content.replace(old_form_start, new_form_start)

    # and close the form div right before the table div
    old_table_start = '<div className="bg-[#1a1d24] border border-[#2e3340] rounded-2xl shadow-xl overflow-hidden">'
    new_table_start = ')}\n\n      <div className="bg-[#1a1d24] border border-[#2e3340] rounded-2xl shadow-xl overflow-hidden">'
    content = content.replace(old_table_start, new_table_start)


    with open(path, 'w') as f:
        f.write(content)

print("Updates completed.")
