// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const Webchat = () => {
    const { locale } = useShellData();

    useEffect(() => {
      WebChat.renderWebChat(
        {
          directLine: window.WebChat.createDirectLine({
            token: 'YOUR_DIRECT_LINE_TOKEN'
          }),
          userID: 'YOUR_USER_ID',
          username: 'Web Chat User',
          locale: locale
        },
        document.getElementById('webchat')
      );
    });

    return <div id="webchat"></div>;
};

module.exports = {
    initialize: (composer) => {
        composer.addWebchat(Webchat);
    }
}