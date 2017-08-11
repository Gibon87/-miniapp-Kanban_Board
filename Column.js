// column.js file

function Column(id, name) {
    var self = this;
    this.id = id;
    this.name = name || 'No name given';
    this.element = createColumn();

    function createColumn() {
        var column = $('<div class="column"></div>');
        var columnTitle = $('<h2 class="column-title">' + self.name + '</h2>');
        var columnCardList = $('<ul class="card-list"></ul>');
        var columnDelete = $('<button class="btn-delete">x</button>');
        var columnAddCard = $('<button class="column-add-card">Add a card</button>');
        
        columnDelete.click(function() {
            alertify.confirm('Delete column', 'Delete "' + self.name + '" column?'
                , function() { 
                    self.deleteColumn();
                    alertify.message('Column "' + name + '" deleted') 
                }
                , function() { 
                    alertify.error('Uff it was close...')
                }).set('labels', {ok:'Delete', cancel:'Naa!'}); 
        });

        columnAddCard.click(function(event) {
            alertify.prompt( 'Card name', 'Enter card name', 'Card name'
               , function(evt, value) { 
                    cardName = value;
                    $.ajax({
                        url: baseUrl + '/card',
                        method: 'POST',
                        data: {
                            name: cardName,
                            bootcamp_kanban_column_id: self.id
                        },
                        success: function(response) {
                            var card = new Card(response.id, cardName);
                            self.createCard(card);
                        }
                    })
                    alertify.success('Card "' + value + '" created') 
               }
               , function() { 
                    alertify.error('Cancelled') 
               }).set('labels', {ok:'Done!', cancel:'Not now'}); ;
                event.preventDefault();
        });
            
        column.append(columnTitle)
            .append(columnDelete)
            .append(columnAddCard)
            .append(columnCardList);
            return column;
        }
    }

Column.prototype = {
    createCard: function(card) {
        this.element.children('ul').append(card.element);
    },
    deleteColumn: function() {
        var self = this;
            $.ajax({
                url: baseUrl + '/column/' + self.id,
                method: 'DELETE',
                success: function(response){
                    self.element.remove(); 
              }
            });
        }
};