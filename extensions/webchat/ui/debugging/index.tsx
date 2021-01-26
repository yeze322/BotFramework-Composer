// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const EmulatorLogs = () => {
    return <div></div>
}

module.exports = {
    initialize: (composer) => {
        composer.addDebugPane('Emulator logs', EmulatorLogs);
    }
}