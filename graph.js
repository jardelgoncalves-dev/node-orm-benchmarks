const D3Node = require('d3-node');
const d3 = require('d3');
const fs = require('fs');
const sharp = require('sharp');

function generateGraph (tempData, title, filename = 'test') {
  const options = {
    d3Module: d3,
    selector: '#chart',
    container: '<div id="container"><div id="chart"></div></div>'
  };
  
  const d3n = new D3Node(options);
  
  const margin = {
   top: 10, right: 5, bottom: 30, left: 5 
  };
  const width = 1000 - margin.left - margin.right;
  const height = 450 - margin.top - margin.bottom;
  const svgWidth = width + margin.left + margin.right;
  const svgHeight = height + margin.top + margin.bottom;
  
  const svg = d3n.createSVG(svgWidth, svgHeight);
  
  const xScale = d3.scaleBand().range([0, width]).padding(0.4);
  const yScale = d3.scaleLinear().range([height, 0]);

  let yMax = d3.max(tempData, (d) => { return d.value; });
  yMax += yMax * 0.3;
  xScale.domain(tempData.map((d) => { return d.name; }));
  yScale.domain([0, yMax]);
  
  svg.append('rect')
      .attr('width', '100%')
      .attr('height', '100%')
      .style('fill', 'white')
  
  svg.append('text')
    .attr('transform', 'translate(150,0)')
    .attr('x', 50)
    .attr('y', 50)
    .attr('font-size', '24px')
    .text(title);
  
  svg.append('g').attr('transform', `translate(${ 100 },${ 100 })`);
  
  svg.append('g')
    .attr('transform', `translate(50,${ height })`)
    .call(d3.axisBottom(xScale))
    .append('text')
    .attr('y', height - 380)
    .attr('x', width - 500)
    .attr('text-anchor', 'end')
    .attr('stroke', 'black')
    .attr('font-size', '14px')
    .text('ORMs');
  
  svg.append('g')
    .attr('transform', 'translate(100,0)')
    .call(d3.axisLeft(yScale).tickFormat((d) => {
      return `${ d }ms`;
    })
    .ticks(5))
    .append('text')
    .attr('transform', 'rotate(-90)')
    .attr('y', 150)
    .attr('x', -180)
    .attr('dy', '-13.8em')
    .attr('text-anchor', 'end')
    .attr('stroke', 'black')
    .attr('font-size', '15px')
    .text('Time');
  
    svg.selectAll('.bar')
      .data(tempData)
      .enter().append('rect')
      .attr('transform', 'translate(50,0)')
      .attr('class', 'bar')
      .attr('x', (d) => { return xScale(d.name); })
      .attr('y', (d) => { return yScale(d.value); })
      .attr('width', xScale.bandwidth())
      .attr('height', (d) => { return height - yScale(d.value); })
      .style('fill', 'orange');
  
  fs.writeFileSync(`results/${filename}.svg`, d3n.svgString());
  sharp(`results/${filename}.svg`)
    .png()
    .toFile(`${filename}.png`)
    .then((info) => {
        console.log('Svg to Png conversion completed', info);
    })
    .catch((err) => {
        console.log(err);
    });
}


const sqData = require('./sequelize.json');
const obData = require('./objection.json');
const bsData = require('./bookshelf.json');

function sum(n1, n2, f=3) {
  return Number((Number(n1) + Number(n2)).toFixed(f))
}

function avg(data = []) {
  const result = data.reduce((acc, d) => ({
    create_user: sum(acc.create_user, d.create_user),
    create_post: sum(acc.create_post, d.create_post),
    select_users: sum(acc.select_users, d.select_users),
    select_posts: sum(acc.select_posts, d.select_post),
    eager_load_posts_by_user: sum(acc.eager_load_posts_by_user, d.select_load_posts_users),
  }), {
    create_user: 0,
    create_post: 0,
    select_users: 0,
    select_posts: 0,
    eager_load_posts_by_user: 0
  })

  return {
    create_user: Number((result.create_user / data.length).toFixed(3)),
    create_post: Number((result.create_post / data.length).toFixed(3)),
    select_users: Number((result.select_users / data.length).toFixed(3)),
    select_posts: Number((result.select_posts / data.length).toFixed(3)),
    eager_load_posts_by_user: Number((result.eager_load_posts_by_user / data.length).toFixed(3))
  }
}

const sequelizeData = avg(sqData)
const objectionData = avg(obData)
const bookshelfData = avg(bsData)

generateGraph([
    { name: 'Bookshelf', value: bookshelfData.create_user },
    { name: 'Objection.js', value: objectionData.create_user },
    { name: 'Sequelize', value: sequelizeData.create_user },
  ],
  'Teste: Criar usuário',
  'create_user'
)

generateGraph([
  { name: 'Bookshelf', value: bookshelfData.create_post },
  { name: 'Objection.js', value: objectionData.create_post },
  { name: 'Sequelize', value: sequelizeData.create_post },
],
'Teste: Criar Post',
'create_post'
)

generateGraph([
  { name: 'Bookshelf', value: bookshelfData.select_users },
  { name: 'Objection.js', value: objectionData.select_users },
  { name: 'Sequelize', value: sequelizeData.select_users },
],
'Teste: Obter todos os usuários',
'select_users'
)

generateGraph([
  { name: 'Bookshelf', value: bookshelfData.select_posts },
  { name: 'Objection.js', value: objectionData.select_posts },
  { name: 'Sequelize', value: sequelizeData.select_posts },
],
'Teste: Obter todos os Posts',
'select_posts'
)

generateGraph([
  { name: 'Bookshelf', value: bookshelfData.eager_load_posts_by_user },
  { name: 'Objection.js', value: objectionData.eager_load_posts_by_user },
  { name: 'Sequelize', value: sequelizeData.eager_load_posts_by_user },
],
'Teste: Carregar posts de um usuário (eager loading)',
'eager_loading'
)