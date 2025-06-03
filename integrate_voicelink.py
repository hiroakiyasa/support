#!/usr/bin/env python3
import re

# Read the original file
with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Read VoiceLink tab
with open('voicelink_tab.html', 'r', encoding='utf-8') as f:
    voicelink_tab = f.read()

# Read VoiceLink content 
with open('voicelink-content.html', 'r', encoding='utf-8') as f:
    voicelink_content = f.read()

# Find the position after golem tab and insert voicelink tab
golem_tab_pattern = r'(<div class="app-tab golem-tab".*?</div>)'
match = re.search(golem_tab_pattern, content, re.DOTALL)
if match:
    pos = match.end()
    content = content[:pos] + '\n' + voicelink_tab + content[pos:]
    print("VoiceLink tab added successfully")

# Find the position after gpt-app content and insert voicelink content
gpt_app_pattern = r'(<!-- 森のウッドゴーレムのコンテンツ -->)'
match = re.search(gpt_app_pattern, content)
if match:
    pos = match.start()
    content = content[:pos] + voicelink_content + '\n        ' + content[pos:]
    print("VoiceLink content added successfully")

# Write the updated file
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print('VoiceLink integration completed successfully!') 