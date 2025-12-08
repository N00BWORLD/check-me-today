from PIL import Image
import sys

def remove_black_background(input_path, output_path, threshold=10):
    print(f"Opening image: {input_path}")
    img = Image.open(input_path).convert("RGBA")
    datas = img.getdata()

    newData = []
    # threshold for "black". 0-255. 
    # Use a small tolerance because generation might not be perfect #000000
    
    for item in datas:
        # item is (R, G, B, A)
        if item[0] <= threshold and item[1] <= threshold and item[2] <= threshold:
            newData.append((255, 255, 255, 0)) # Make it transparent
        else:
            newData.append(item)

    img.putdata(newData)
    print(f"Saving to: {output_path}")
    img.save(output_path, "PNG")

if __name__ == "__main__":
    # Hardcoded paths heavily based on project structure
    input_file = r"c:\cursor\check_me_today\public\images\vn\starfall\sera_main.png"
    # Overwrite the file or create a new one? 
    # Let's overwrite to keep code simple, OR save as temp and then move.
    # Actually, replacing the file directly is risky if it fails mid-write.
    # Let's save to a temp file first.
    output_file = r"c:\cursor\check_me_today\public\images\vn\starfall\sera_main_transparent.png"
    
    try:
        remove_black_background(input_file, output_file, threshold=15)
        print("Success")
    except Exception as e:
        print(f"Error: {e}")
