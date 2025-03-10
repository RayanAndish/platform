import os

def update_solidity_version(path):
    for root, dirs, files in os.walk(path):
        for file in files:
            if file.endswith(".sol"):
                filepath = os.path.join(root, file)
                with open(filepath, "r") as f:
                    content = f.read()
                updated_content = content.replace("pragma solidity ^0.8.17;", "pragma solidity ^0.8.28;")
                with open(filepath, "w") as f:
                    f.write(updated_content)
                print(f"Updated {filepath}")
# استفاده از تابع
update_solidity_version("/home/errick/core/node_modules/@aragon")
