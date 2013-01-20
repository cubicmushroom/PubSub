CMPubSub = {
    subscribers: {},
    sub: function(topic, callback, priority) {
        // Check topic is a string
        if ('string' != typeof topic) {
            throw new Error('topic must be a string');
        }
        // If the callback is an array, the 1st item is the callback, the 2nd the contxt
        var context = null;
        if (callback instanceof Array) {
            context  = callback[1];
            callback = callback[0];
        }
        // Now check that the callback is a function
        if ('function' != typeof callback) {
            throw new Error('callback must be a function');
        }
        // Set default priority if not provided
        if ('undefined' == typeof priority) {
            priority = 9;
        }
        // Check priority is a number
        if ('number' != typeof priority) {
            throw new Error('priority must be a number');
        }
        // Check the level of this.subscribers exists, or create it
        if ('undefined' == typeof this.subscribers[topic]) {
            this.subscribers[topic] = {};
        }
        if ('undefined' == typeof this.subscribers[topic][priority]) {
            this.subscribers[topic][priority] = [];
        }
        // And finally add the callback
        this.subscribers[topic][priority].push({
            callback: callback,
            context: context
        });
    },
    pub: function(topic /*, [[[arg], arg], ...] */) {
        // Check we have a valid topic
        if ('undefined' == typeof topic) {
            throw new Error('No topic');
        }
        if ('string' != typeof topic) {
            throw new Error('Topic must be a string');
        }

        // Do we have any subscribers for this topic?
        if ('object' == typeof this.subscribers[topic]) {
            var subscribers = this.subscribers[topic];
        }

        // Get priorities used & sort in ascending order
        var priorities = new Array();
        for (priority in subscribers) {
            priorities.push(priority);
        }
        priorities.sort(function(a, b){return Number(a)<=Number(b);});

        // Now cycle through subscribers in each priority & call them
        for (var i = priorities.length - 1; i >= 0; i--) {
            var callbacks = subscribers[priorities[i]];

            // We reverse the order so we can use the improved native for loop
            callbacks.reverse();
            for (var j = callbacks.length - 1; j >= 0; j--) {
                var ret = callbacks[j].callback.apply(
                    callbacks[j].context, Array.prototype.slice.call( arguments, 1 )
                );
                if (false === ret) {
                    return false;
                }
            }
        };  
        return true;
    }
}