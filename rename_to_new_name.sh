#!/bin/bash

# Check if a new project name is provided
if [ $# -ne 1 ]; then
    echo "Usage: $0 <new_project_name>"
    exit 1
fi

new_project_name="$1"
old_project_name="template"

# Function to replace project name in files
replace_project_name() {
    local old_name="$1"
    local new_name="$2"
    local dir="$3"

    echo "Replacing '$old_name' with '$new_name' in $dir files..."
    grep -rl "$old_name" "$dir" --exclude-dir={.git,node_modules} | while read -r file; do
        sed -i '' "s/\b${old_name}\b/${new_name}/g" "$file"  # Use word boundaries to prevent partial matches
    done

    # Rename files and directories
    echo "Renaming files and directories containing '$old_name' in $dir..."
    find "$dir" -depth -name "*${old_name}*" | while IFS= read -r path; do
        new_path=$(echo "$path" | sed "s/\b${old_name}\b/${new_name}/g")  # Use word boundaries to prevent partial matches
        mv "$path" "$new_path"
    done
}

# Replace names for frontend and backend directories
replace_project_name "$old_project_name" "$new_project_name" "template-frontend"
replace_project_name "$old_project_name" "$new_project_name" "template-backend"

# Update project name in docker-compose.yml
docker_compose_file="docker-compose.yml"
if [ -f "$docker_compose_file" ]; then
    echo "Updating project name in $docker_compose_file..."
    sed -i '' "s/\b${old_project_name}\b/${new_project_name}/g" "$docker_compose_file"  # Use word boundaries
fi

echo "Project names successfully updated to '$new_project_name'."