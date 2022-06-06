export function pageStyle() {
    return /*css*/`
    <style>
            *,
            *::after,
            *::before {
                box-sizing: border-box;
            }

            body {
                font-family: cursive, 'Arial';
                color: #000000c7;

            }

            #app {
                max-width: calc(100% - 30px);
                margin-left: auto;
                margin-right: auto;
                margin-top: 30px;
                width: 600px;

            }

            .post {
                box-shadow: 0px 1px 14px #00000030;
                border-radius: 16px;
                margin-bottom: 26px;
                padding: 15px;
            }
            .post > div + div {
                margin-top: 10px;
            }
            .post > div strong {
                color: rgb(185, 101, 32);
            }

            .post .post--id {
                border-right: 1px solid;
                width: 30px;
            }

            .post .post--title {
                border-right: 1px solid;
                width: 40%;
            }
    </style>`
};


