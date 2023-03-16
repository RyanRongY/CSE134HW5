Vue.component('button-count-vue', {
    data: function () {
        return {
            count: 0
        }
    },
    methods: {
        incrementCount: function () {
            this.count++;
        }
    },
    template: `
        <div>
            <button @click="incrementCount">Click me ({{ count }})</button>
        </div>
    `
});

new Vue({
    el: '#app'
});
