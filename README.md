PubSub
======

Javascript PubSub library supporting priorities & interruption using `return false`.


Simple Example
--------------

To subscribe to a topic, simple use the CMPubSub.subscribe() method...

    var callback = function(msg) {
        alert(msg);
    };
    CMPubSub.sub('topicName', callback);

**Note:** The topic does not need to be pre-defined.  You can subscribe to it before CMPubSub
is made aware of it.

And to publish to a topic...

    var obj = {
        some: 'info'
    };
    CMPubSub.pub('topicName', obj, 1, 2, 'a', 'b');

In this example, the `callback` function will be called with the arguments `[1, 2, 'a', 'b']`.
Within the callback, `this` will refer to the obj object

**Note:** Passing a primitive type variable (number or string) is not done by reference, so
any changes to it will not be perpetuated after the callback.  Non-primitive variables are
passed by reference, therefore you can modify the object & the changes will be perpetuated.


Prioritising Callbacks
----------------------
You can add a 3rd parameter to the `CMPubSub.sub()` call to set the priority of the callback.
The priority needs to be a number, with 1 is the highest priority.  The default priority,
if none is provided, is 9.



Interrupting Publish
--------------------
And callback can interrupt the publishing process, & get the `CMPubSub.pub()` method to return
false, simply by returning `false`.  This will prevent any subsequent callback from being
called, & provide feedback to the calling function that the process has been interrupted.
If the publish is not interrupted, or if there are no subscribers, then the `CMPubSub.pub()`
call will return `true`.




Roadmap
-------

1. Add the ability to un-subscribe;
2. Add namespacing for topics (like jQuery does), to make it easier to un-subscribe from events;