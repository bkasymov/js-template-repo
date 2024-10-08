#!/bin/bash

# Define old and new project names
old_frontend_name="frontend"
new_frontend_name="template-frontend"

old_backend_name="backend"
new_backend_name="template-backend"

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

    # Update project name in package.json and package-lock.json
    for package_file in "$dir/package.json" "$dir/package-lock.json"; do
        if [ -f "$package_file" ]; then
            echo "Updating project name in $package_file..."
            sed -i '' "s/\"name\": \"$old_name\"/\"name\": \"$new_name\"/" "$package_file"  # Update name field
        fi
    done

    # Update project name in docker-compose.yml
    docker_compose_file="docker-compose.yml"
    if [ -f "$docker_compose_file" ]; then
        echo "Updating project name in $docker_compose_file..."
        sed -i '' "s/\b${old_name}\b/${new_name}/g" "$docker_compose_file"  # Use word boundaries to prevent partial matches
        # Specifically update service names
        sed -i '' "s/\bbackend\b/${new_backend_name}/g" "$docker_compose_file"  # Use word boundaries
        sed -i '' "s/\bfrontend\b/${new_frontend_name}/g" "$docker_compose_file"  # Use word boundaries
    fi

    # Update project name in other common configuration files
    config_files=("webpack.config.js" "babel.config.js" "tsconfig.json" "Makefile")
    for config_file in "${config_files[@]}"; do
        if [ -f "$dir/$config_file" ]; then
            echo "Updating project name in $dir/$config_file..."
            sed -i '' "s/\b${old_name}\b/${new_name}/g" "$dir/$config_file"  # Use word boundaries
        fi
    done
}

# Replace names for frontend
replace_project_name "$old_frontend_name" "$new_frontend_name" "template-frontend"

# Replace names for backend
replace_project_name "$old_backend_name" "$new_backend_name" "template-backend"

echo "Project names successfully updated."