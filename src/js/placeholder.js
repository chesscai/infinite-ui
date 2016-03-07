/**
 * placeholder 组件
 * @param {String}      target           被侦听的目标，className、ID ...
 * @param {String}      cloneClass       针对 name=password 进行 css 微调
 *
 * @example
 * $('form').IUI({target:'.form-control'});
 */
$.fn.IUI({
    placeholder: function(options) {
        return this.each(function() {
            var isSupport = common.isPlaceholder();
            if (isSupport) {
                return false;
            }

            var defaults = {
                target: '.form-control',
                cloneClass: 'clone-password'
            };
            var $this = $(this);
            var $window = $(window);
            var config = $.extend({}, defaults, options);



            $this.find(config.target).each(function(index, el) {
                var _placeholder = $(el).attr('placeholder');
                var $el = $(el);
                if (el.type === 'password') {

                    var $clone = $('<input class="' + config.target.slice(1) + '" type="text">');

                    $el.css({
                        'display': 'none'
                    });

                    $clone.addClass(config.cloneClass).val(_placeholder);
                    $el.parent().append($clone);
                } else {
                    el.value = _placeholder;
                }
            });

            $this.find(config.target).on({
                focus: function(event) {
                    if ($(this).hasClass('clone-password')) {
                        $(this).css({
                            'display': 'none'
                        });
                        $(this).parent().find('input[type=password]').css({ 'display': 'block' }).focus();
                        return false;
                    }

                    if (this.value === $(this).attr('placeholder')) {
                        this.value = '';
                    }
                },
                blur: function(event) {
                    if ($(this).attr('type') === 'password' && !this.value) {
                        $(this).css({
                            'display': 'none'
                        });
                        $(this).parent().find('.clone-password').css({
                            'display': 'block'
                        });
                        return false;
                    }

                    if (!this.value) {
                        this.value = $(this).attr('placeholder');
                    }
                }
            });
        });
    }
});
