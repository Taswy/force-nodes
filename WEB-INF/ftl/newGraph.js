    var switcherPath = "../../assets/Image/switcher.png"
    var serverPath = "../../assets/Image/server.png"
    function showGraph(type) {
        
       var canvas = document.querySelector("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width,
        height = canvas.height;

        var simulation = d3.forceSimulation()
        .force("link", d3.forceLink().distance(100).strength(0.5))
        .force("charge", d3.forceManyBody())
        .force("center", d3.forceCenter());

       var nodes = [{id: 0, group: 0}, {id: 1, group: 0},{id: 2, group: 0},{id: 3, group: 1},{id: 4, group: 0}, {id: 5, group: 1}];
       var links = [{source : 0, target : 1, value : 20}, {source : 0, target : 2, value : 1}, {source : 1, target : 3, value : 1},
        {source : 2, target : 4, value : 1}, {source : 4, target : 5, value : 1},{source : 1, target : 5, value : 1},{source : 2, target : 5, value : 1}];
        simulation
        .nodes(nodes)
        .on("tick", ticked);

        simulation.force("link")
        .links(links);

        d3.select(canvas)
      .call(d3.drag()
          .container(canvas)
          .subject(dragsubject)
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended));

          
        function dragsubject() {
                return simulation.find(d3.event.x, d3.event.y);
              }

        function ticked() {
                context.clearRect(0, 0, width, height);
                context.save();
                context.translate(width / 2, height / 2);

                context.beginPath();
                links.forEach(drawLink);
                context.strokeStyle = "#aaa";
                context.stroke();

                context.beginPath();
                nodes.forEach(drawNode);
                context.fill();
                context.strokeStyle = "#fff";
                context.stroke();

                context.restore();
        }
        

        function drawLink(d) {
        context.moveTo(d.source.x, d.source.y);
        context.lineTo(d.target.x, d.target.y);
        }

        function drawNode(d) {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
            var img = new Image();
            switch (d.group) {
                case 0:
                        img.src = switcherPath;
                        context.drawImage(image=img, dx=d.x-20, dy=d.y-20, dw=40, dh=40);
                break;
                case 1:
                        img.src = serverPath;
                        context.drawImage(image=img, dx=d.x-20, dy=d.y-20, dw=40, dh=40);
                        break;

                default:
                        break;
            }
        }

        function dragstarted() {
                if (!d3.event.active) simulation.alphaTarget(2).restart();
                d3.event.subject.fx = d3.event.subject.x;
                d3.event.subject.fy = d3.event.subject.y;
              }
              
              function dragged() {
                d3.event.subject.fx = d3.event.x;
                d3.event.subject.fy = d3.event.y;
              }
              
              function dragended() {
                if (!d3.event.active) simulation.alphaTarget(0);
                d3.event.subject.fx = null;
                d3.event.subject.fy = null;
              }
              
    }
