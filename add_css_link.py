#!/usr/bin/env python3

# Read the file
with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Add CSS link before </head>
css_link = '  <link rel="stylesheet" href="voicelink-styles.css">\n'
content = content.replace('</head>', css_link + '</head>')

# Write the file back
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print('VoiceLink CSS link added successfully!') 