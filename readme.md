# Creati's grid layout component for React

Our grid systems base on [Flexbox Grid layout](http://flexboxgrid.com) and **CSS modules** to allow the elements within the parent to be aligned.

## Breakpoints
```
XS: 0px; 
SM: 576px; // Small devices (landscape phones)
MD: 768px; // Medium devices (tablets)
LG: 992px; // Large devices (desktops)
XL: 1200px; // Extra large devices (large desktops)
```
### Sizes
`[sizes]: xs, sm, md, lg, xl`

## Subcomponents
`import { Container, Row, Col } from 'react-flexbox-creati';`

Since flexbox is a whole module and not a single property, it involves a lot of things including its whole set of properties. Some of them are meant to be set on the container (parent element, known as “flex container”) whereas the others are meant to be set on the children (said “flex items”, for eg. Row, Col).

<img src="https://css-tricks.com/wp-content/uploads/2018/10/01-container.svg" alt="Container" style="width: 40%; margin: 50px 0 25px 0;" />

<img src="https://css-tricks.com/wp-content/uploads/2018/10/02-items.svg" alt="Items" style="width: 40%; margin: 50px 0 25px 0;" />

<img src="https://css-tricks.com/wp-content/uploads/2018/11/00-basic-terminology.svg" alt="Basic terminology" style="width: 80%; margin: 25px 0 50px 0;" />

In the grid system, we define the frame outside the information area based on `row` and `column`, to ensure that every area can have stable arrangement.

Following is a brief look at how it works:

- Establish a set of `column` in the horizontal space defined by `row` (abbreviated col).
- Your content elements should be placed directly in the `col`, and only col should be placed directly in `row`.
- The column grid system is a value of 1-12 to represent its range spans. For example, three columns of equal width can be created by `<Col xs={span: 4}> </Col>`.
- If the sum of `col` spans in a `row` are more than 12, then the overflowing `col` as a whole will start a new line arrangement.

### Container
Parent element. It's optional if you would like to group the items somehow.

##### Properties
```
fluid: BOOLEAN
```

##### Example
```
<Container fluid>
</Container>
```

### Row, Col
You can create a basic grid system by using a single set of `Row` and `Col` grid assembly, all of the columns (Col) must be placed in `Row`.

##### Properties: Row
```
[sizes]: OBJECT {align: STRING(top, middle, bottom), justify: STRING(start, end, center, around, between)}
gutters: ARRAY [horizontal, vertical]
```

`[sizes]`  
Responsive modifiers enable specifying different column sizes, offsets, alignment and distribution at (over) xs, sm, md & lg viewport widths.

`justify`  
This defines the alignment along the main axis. It helps distribute extra free space leftover when either all the flex items on a line are inflexible, or are flexible but have reached their maximum size. It also exerts some control over the alignment of items when they overflow the line.

`align`  
This aligns a flex container’s lines within when there is extra space in the cross-axis, similar to how `justify` aligns individual items within the main-axis.

`gutters`  
You can use the `gutters` property of `Row` as grid spacing: `gutters: [16,16]` or `gutters: [0,16]` or `gutters: [16,0]`

##### Properties: Col
```
[sizes]: OBJECT {span: INTEGER(1-12), offset: INTEGER(1-12), order: INTEGER(-1-99), dynamic: BOOLEAN}, hide: STRING(sizes)
```

`[sizes]`  
Responsive modifiers enable specifying different column sizes, offsets, alignment and distribution at (over) xs, sm, md & lg viewport widths.

`span`  
Raster number of cells to occupy.

`offset`  
The number of cells to offset Col from the left.

`order`  
Add classes to reorder columns. First: -1, last: 99

`hide`  
Hide the column BELOW the given breakpoint.

`dynamic`  
If you would like to disable the grid sizing rules, and determine the column width in SCSS or CSS, you have to use this attribute.

##### Example
```
<Row xs={{ justify: 'center', align: 'middle' }} gutters={[16,16]}>
   <Col xs={{ span: 12 }} md={{ span: 3 }}>
      <div>Content 1</div>
   </Col>
   <Col xs={{ span: 12 }} md={{ span: 2 }}>
      <div>Content 2</div>
   </Col>
   <Col xs={{ span: 12 }} md={{ span: 7 }}>
      <div>Content 3</div>
   </Col>
</Row>
<Row xs={{ justify: 'between', align: 'top' }} gutters={[16,0]}>
   <Col xs={{ dynamic: true }} md={{ span: 3 }}>
      <div>Content 1</div>
   </Col>
   <Col xs={{ span: 12 }} md={{ span: 2 }}>
      <div>Content 2</div>
   </Col>
   <Col xs={{ span: 12 }} lg={{ span: 7 }}, hide='md'>
      <Row>
         <Col xs={{ span: 12 }} lg={{ span: 3 }}>
            <div>Nested content 1</div>
         </Col>
         <Col xs={{ span: 12 }} md={{ span: 4 }} lg={{ span: 2 }}>
            <div>Nested content 2</div>
         </Col>
         <Col xs={{ span: 12, order: -1 }} lg={{ span: 7 }}>
            <div>Nested content 3</div>
         </Col>
      </Row>
   </Col>
</Row>
```

