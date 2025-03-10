#!/bin/bash

# Update core contracts
find /home/errick/core/node_modules/@aragon/osx-v1.3.0/core -name "*.sol" -type f -exec sed -i 's/pragma solidity ^0.8.8/pragma solidity ^0.8.28/g' {} +
find /home/errick/core/node_modules/@aragon/osx-v1.3.0/core -name "*.sol" -type f -exec sed -i 's/pragma solidity 0.8.8/pragma solidity ^0.8.28/g' {} +

# Update framework contracts
find /home/errick/core/node_modules/@aragon/osx-v1.3.0/framework -name "*.sol" -type f -exec sed -i 's/pragma solidity ^0.8.8/pragma solidity ^0.8.28/g' {} +
find /home/errick/core/node_modules/@aragon/osx-v1.3.0/framework -name "*.sol" -type f -exec sed -i 's/pragma solidity 0.8.8/pragma solidity ^0.8.28/g' {} +

# Update plugin contracts
find /home/errick/core/node_modules/@aragon/osx-v1.3.0/plugins -name "*.sol" -type f -exec sed -i 's/pragma solidity ^0.8.8/pragma solidity ^0.8.28/g' {} +
find /home/errick/core/node_modules/@aragon/osx-v1.3.0/plugins -name "*.sol" -type f -exec sed -i 's/pragma solidity 0.8.8/pragma solidity ^0.8.28/g' {} +

# Update specific files that might have been missed
find /home/errick/core/node_modules/@aragon/osx-v1.3.0/core/plugin -name "*.sol" -type f -exec sed -i 's/pragma solidity ^0.8.8/pragma solidity ^0.8.28/g' {} +
find /home/errick/core/node_modules/@aragon/osx-v1.3.0/core/permission -name "*.sol" -type f -exec sed -i 's/pragma solidity ^0.8.8/pragma solidity ^0.8.28/g' {} +
find /home/errick/core/node_modules/@aragon/osx-v1.3.0/framework/plugin/setup -name "*.sol" -type f -exec sed -i 's/pragma solidity ^0.8.8/pragma solidity ^0.8.28/g' {} +
find /home/errick/core/node_modules/@aragon/osx-v1.3.0/plugins/utils -name "*.sol" -type f -exec sed -i 's/pragma solidity ^0.8.8/pragma solidity ^0.8.28/g' {} +
find /home/errick/core/node_modules/@aragon/osx-v1.3.0/plugins/governance/majority-voting -name "*.sol" -type f -exec sed -i 's/pragma solidity ^0.8.8/pragma solidity ^0.8.28/g' {} +

echo "Solidity version has been updated in all contract files" 