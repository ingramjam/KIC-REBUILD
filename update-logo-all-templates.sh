#!/bin/bash

# Update logo in all quit program templates
templates=(
  "quit-smoking.html"
  "quit-vaping.html"
  "quit-smokeless.html"
  "quit-marijuana.html"
  "quit-videos.html"
  "quit-now.html"
  "contact.html"
)

cd "Kick It California/templates"

for template in "${templates[@]}"; do
  if [ -f "$template" ]; then
    echo "Updating $template..."
    
    # Replace the logo text with image tag
    sed -i '' 's|<a href="https://244593765.hs-sites-na2.com/home" class="logo">KICK IT CALIFORNIA</a>|<a href="https://244593765.hs-sites-na2.com/home" class="logo">\n        <img src="https://www.kickitca-wp.ucsd.edu/wp-content/uploads/2021/06/Primary.png" alt="Kick It California">\n      </a>|g' "$template"
    
    # Update CSS for logo (find and replace the .logo style block)
    # This is trickier with sed, so we'll handle it separately if needed
    
    echo "✓ Updated $template"
  else
    echo "⚠ $template not found"
  fi
done

echo ""
echo "✅ All templates updated with logo image!"
