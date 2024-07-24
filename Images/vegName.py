import os
import shutil

def numerical_sort(value):
    return int(os.path.splitext(value)[0])

def rename_and_copy_images(folder_path, new_folder_path):
    # Create the new folder if it doesn't exist
    if not os.path.exists(new_folder_path):
        os.makedirs(new_folder_path)
    
    # Get a list of files in the original folder
    files = os.listdir(folder_path)
    # Filter the list to include only .jpg files
    image_files = [f for f in files if f.lower().endswith('.jpg')]

    # Sort the image files numerically
    image_files.sort(key=numerical_sort)

    # Copy and rename the image files to the new folder
    for index, filename in enumerate(image_files, start=1):
        # Get the file extension
        file_extension = os.path.splitext(filename)[1]
        # Create the new filename
        new_filename = f"{index}{file_extension}"
        # Get the full paths for the old and new filenames
        old_file_path = os.path.join(folder_path, filename)
        new_file_path = os.path.join(new_folder_path, new_filename)
        
        # Copy the file to the new folder with the new name
        shutil.copy(old_file_path, new_file_path)
        print(f"Copied and renamed {old_file_path} to {new_file_path}")

# Usage example
folder_path = "C:/Users/mannu/Desktop/Projects/Fresh-Veg/Images/vegetable"
new_folder_path = "C:/Users/mannu/Desktop/Projects/Fresh-Veg/Images/renamed_vegetable"
rename_and_copy_images(folder_path, new_folder_path)
print("Done")
