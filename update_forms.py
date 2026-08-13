import os
import re

files = [
    '/Users/mehedihasanmridul/website/musafly-admin-dashboard/src/app/(dashboard)/tours/page.tsx',
    '/Users/mehedihasanmridul/website/musafly-admin-dashboard/src/app/(dashboard)/testimonials/page.tsx'
]

for filepath in files:
    with open(filepath, 'r') as f:
        content = f.read()

    # Change initial formData state to include `image: null` instead of `image_url: ''`
    if 'image_url' in content:
        content = content.replace("image_url: ''", "image: null as File | null")
        
    # Update the handleSubmit to use FormData
    if 'await axios.post(API_URL, formData)' in content:
        form_data_logic = """      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null && value !== '') {
          data.append(key, value as string | Blob);
        }
      });
      await axios.post(API_URL, data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });"""
        content = content.replace('await axios.post(API_URL, formData);', form_data_logic)

    # Change the input type from url to file
    content = re.sub(
        r'<input type="url"[^>]*value=\{formData\.image_url\}[^>]*onChange=\{e => setFormData\(\{\.\.\.formData, image_url: e\.target\.value\}\)\}[^>]*/>',
        '<input type="file" accept="image/*" className="bg-[#0f1115] border border-[#2e3340] p-3 rounded-xl text-white focus:outline-none focus:border-[#5B9BD5] transition-colors" onChange={e => setFormData({...formData, image: e.target.files ? e.target.files[0] : null})} />',
        content
    )
    
    # Change "Image URL" label to "Image"
    content = content.replace('>Image URL</label>', '>Image</label>')

    with open(filepath, 'w') as f:
        f.write(content)

print("Updated forms")
