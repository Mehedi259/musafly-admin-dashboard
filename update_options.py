import os

form_path = "src/components/forms/ManualBookingForm.tsx"

with open(form_path, "r") as f:
    content = f.read()

content = content.replace(
    "service_category: initialData?.service_category || 'ফ্লাইট টিকিট',",
    "service_category: initialData?.service_category || 'Flight Ticket',"
)

content = content.replace(
    """<option>ফ্লাইট টিকিট</option>
                <option>হোটেল বুকিং</option>
                <option>ভিসা প্রসেসিং</option>
                <option>ওমরাহ প্যাকেজ</option>
                <option>হলিডে ট্যুর</option>""",
    """<option>Flight Ticket</option>
                <option>Visa Process</option>
                <option>Umrah</option>
                <option>Tour</option>
                <option>Ads</option>"""
)

with open(form_path, "w") as f:
    f.write(content)
print("Updated successfully")
