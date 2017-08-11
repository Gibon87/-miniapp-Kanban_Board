// board.js file

var board = {
    name: 'Kanban board',
    createColumn: function(column) {
      this.element.append(column.element);
      initSortableCards();
      initSortableColumns();
    },
    element: $('#board .column-container')
};

$('.create-column').click(function() {
    alertify.prompt('Column name', 'Enter the column name', 'Column name'
    , function(evt, value) { 
        alertify.success('Column "' + value + '" created');
        var columnName = value;
        $.ajax({
            url: baseUrl + '/column',
            method: 'POST',
            data: {
                name: columnName
            },
            success: function(response){
                var column = new Column(response.id, columnName);
                board.createColumn(column);
            }
        });   
    }
    , function() { 
        alertify.error('Cancelled') 
    }).set('labels', {ok:'Done!', cancel:'Not now'}).set({transition:'slide'}).show();
});

function initSortableCards() {
    $('.card-list').sortable({
        connectWith: '.card-list',
        // stop: function( event, ui ) {
        //     console.log('send request ajax - cards')
        // },
        placeholder: 'card-placeholder'
    }).disableSelection();
}

function initSortableColumns() {
    $('.column-container').sortable({
        connectWith: '.column-container',
        // stop: function( event, ui ) {
        //     console.log('send request ajax - columns')
        // },
        placeholder: 'column-placeholder'
        }).disableSelection();
}
