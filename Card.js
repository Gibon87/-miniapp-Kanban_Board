// card.js file

function Card(id, name) {
    var self = this;
    this.id = id;
    this.name = name || 'No name given';
    this.element = createCard();

    function createCard() {
        var card = $('<li class="card"></li>');
        var cardDeleteBtn = $('<button class="btn-delete">x</button>');
        var cardDescription = $('<p class="card-description"></p>');
        
        cardDeleteBtn.click(function(){
            alertify.confirm('Delete card', 'Delete "' + self.name +'" card?'
                , function() {
                    self.removeCard(); 
                    alertify.message('Card "' + self.name + '" deleted') 
                }
                , function() { 
                    alertify.error('Uff it was close... :)')
                }).set('labels', {ok:'Delete', cancel:'Naa!'}); ;
        });
        
        card.append(cardDeleteBtn);
        cardDescription.text(self.name);
        card.append(cardDescription);
        return card;
    }
}

Card.prototype = {
    removeCard: function() {
        var self = this;
        $.ajax({
            url: baseUrl + '/card/' + self.id,
            method: 'DELETE',
            success: function(){
                self.element.remove();
            }
        });
    }
}



