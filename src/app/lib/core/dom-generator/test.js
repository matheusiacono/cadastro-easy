import DomGenerator from '.';
import createVNode from '../create-v-node';

const TEXT_NODE_TYPE = 3;

describe('test DomGenerator.createElement', () => {
  const generator = new DomGenerator();

  it('should create an html element', () => {
    const vNode = <div />;
    const el = generator.createElement(vNode);

    expect(el.tagName).toEqual('DIV');
  });

  it('should create an text node from a string', () => {
    const vNode = 'oi';
    const el = generator.createElement(vNode);

    expect(el.nodeType).toEqual(TEXT_NODE_TYPE);
    expect(el.textContent).toEqual(vNode);
  });

  it('should create an text node from a number', () => {
    const vNode = 3;
    const el = generator.createElement(vNode);

    expect(el.nodeType).toEqual(TEXT_NODE_TYPE);
    expect(el.textContent).toEqual(`${vNode}`);
  });

  it('should create child elements', () => {
    const vNode = (
      <div>
        <span />
        3
      </div>
    );

    const el = generator.createElement(vNode);

    expect(el.outerHTML).toEqual('<div><span></span>3</div>');
  });

  it('should not create null child', () => {
    const vNode = (
      <div>
        <span />
        oi
        {null}
      </div>
    );

    const el = generator.createElement(vNode);

    expect(el.outerHTML).toEqual('<div><span></span>oi</div>');
  });

  it('should not create false child', () => {
    const vNode = (
      <div>
        <span />
        2
        {false}
      </div>
    );

    const el = generator.createElement(vNode);

    expect(el.outerHTML).toEqual('<div><span></span>2</div>');
  });

  describe('set props to element', () => {
    beforeEach(() => {
      document.body.innerHTML = '';
    });

    it('should set props to element', () => {
      const vNode = (
        <div class="test">
          <div />
        </div>
      );

      const el = generator.createElement(vNode);
      document.body.appendChild(el);
      const elsWithClass = document.getElementsByClassName('test');

      expect(elsWithClass).toHaveLength(1);
    });

    it('should set props to element and child element', () => {
      const vNode = (
        <div class="test">
          <div class="test" />
        </div>
      );

      const el = generator.createElement(vNode);
      document.body.appendChild(el);
      const elsWithClass = document.getElementsByClassName('test');

      expect(elsWithClass).toHaveLength(2);
    });

    it('should not set props of non-Object values', () => {
      const divString = '<div></div>';
      const vNode = createVNode('div', 'teste');
      const vNode2 = createVNode('div', 3);
      const vNode3 = createVNode('div');
      const el = generator.createElement(vNode);
      const el2 = generator.createElement(vNode2);
      const el3 = generator.createElement(vNode3);

      expect(el.outerHTML).toEqual(divString);
      expect(el2.outerHTML).toEqual(divString);
      expect(el3.outerHTML).toEqual(divString);
    });
  });
});

describe('test DomGenerator.generate', () => {
  const generator = new DomGenerator();
  beforeEach(() => {
    document.body.innerHTML = '<div id="app"></div>';
  });

  it('should generate dom elements from VirtualNode', () => {
    const div = <div />;
    const container = document.getElementById('app');
    generator.generate(container, div);

    expect(container.innerHTML).toEqual('<div></div>');
  });
});
