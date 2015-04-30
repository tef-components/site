ModalCtrl = function() {
    this.show = false;
}

ModalCtrl.prototype.accept = function() {
    this.show = false;
};

ModalCtrl.prototype.cancel = function() {
    this.show = false;
};

ModalCtrl.prototype.showForm = function() {
    this.show = true;
};

app.controller('ModalCtrl', ModalCtrl);