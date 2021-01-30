function openByPromise(options) {
    return new Promise((resolve, reject) => {
        const conf = new Modal({
            modalTitle: options.modalTitle,
            modalText: options.modalText,
            onClose() {
                conf.destroy()
            },
            modalFooter: [,
                {
                    text: "КУПИТЬ",
                    type: "danger",
                    closable: true,
                    handler() {
                        conf.close()
                        resolve()
                        console.log('Danger btn was clicked')
                    }
                },
                {
                    text: "ЗАКРЫТЬ",
                    type: "danger",
                    closable: true,
                    handler() {
                        conf.close()
                        reject();
                        console.log('Danger btn was clicked')
                    }
                }
            ]

        })
        setTimeout(() => conf.open(), 100);
    })
}