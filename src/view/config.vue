<<template>
  <div>
    <a class="btn btn-default" id="add-new-widget" href="#">Add Widget</a>
    <div class="grid-stack"></div>
  </div>
</template>

<script>
require("bootstrap/dist/css/bootstrap.min.css")
require("gridstack/dist/gridstack.min.css")
require("lodash")
var $ = require("jquery")
require("jquery-ui")
require("gridstack")
export default {
  ready () {
    var options = {
      float: true
    };
    $('.grid-stack').gridstack(options);

    new function () {
        this.items = [
            {x: 0, y: 0, width: 2, height: 2},
            {x: 3, y: 1, width: 1, height: 2},
            {x: 4, y: 1, width: 1, height: 1},
            {x: 2, y: 3, width: 3, height: 1},
  //                    {x: 1, y: 4, width: 1, height: 1},
  //                    {x: 1, y: 3, width: 1, height: 1},
  //                    {x: 2, y: 4, width: 1, height: 1},
            {x: 2, y: 5, width: 1, height: 1}
        ];

        this.grid = $('.grid-stack').data('gridstack');

        this.addNewWidget = function () {
            var node = this.items.pop() || {
                        x: 12 * Math.random(),
                        y: 5 * Math.random(),
                        width: 1 + 3 * Math.random(),
                        height: 1 + 3 * Math.random()
                    };
            this.grid.addWidget($('<div><div class="grid-stack-item-content" /><div/>'),
                node.x, node.y, node.width, node.height);
            return false;
        }.bind(this);

        $('#add-new-widget').click(this.addNewWidget);
    };
}
}
</script>

<style>
        .grid-stack {
            background: lightgoldenrodyellow;
        }

        .grid-stack-item-content {
            color: #2c3e50;
            text-align: center;
            background-color: #18bc9c;
        }
    </style>
