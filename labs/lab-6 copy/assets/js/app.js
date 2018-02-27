$('.item').click(function(){

    if (!$(this).hasClass('in-cart')) {
        var current_count = $('.item-count').html(),
        current_value = Math.abs(current_count),    
        new_count   = current_value + 1;

        $('.item-count').html(new_count);
        $(this).addClass('in-cart');
        add_to_cart(this);
    }
});

$('.cart-toggle').click(function() {
    $('.cart').toggleClass('hide');
});

function add_to_cart(line_item) {
    var value = $(line_item).data('value'),
        price = $(line_item).data('price'),
        img   = $(line_item).data('img'),
        target = $(line_item).data('target'),
        line_item_html = '<div data-target="' + target + '" data-value="' + value + '" class="line-item"><div class="line-item-img '+ img +'"></div><div class="line-item-price">' + price + '</div></div>';


    $('.line-items').prepend(line_item_html);
    console.log(value);
    update_total(value);
}

function update_total(line_item_value) {
    var current_value = $('.total').data('value'),
        new_value = current_value + line_item_value, 
        new_price = new_value.toLocaleString();
       
        console.log(current_value);

    $('.total').html(new_price);
    $('.total').data('value', new_value);
}

$('.line-items').on('click', '.line-item', function() {
    var current_value = $('.total').data('value'),
        line_item_value = $(this).data('value'),
        new_value = current_value - line_item_value,
        new_price = new_value.toLocaleString();

    $(this).html('').removeClass('line-item');
    $('.total').html(new_price);
    $('.total').data('value', new_value);

    var shopping_item_class = $(this).data('target')
    $(shopping_item_class).removeClass('in-cart');

    var current_item_count = $('.item-count').html(),
        updated_item_count = current_item_count - 1;
    
    $('.item-count').html(updated_item_count);
});
