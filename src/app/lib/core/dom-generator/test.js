import DomGenerator from '.';
import createVNode from '../create-v-node';

const TEXT_NODE_TYPE = 3;

describe('test DomGenerator.createElement', () => {
  it('should create an html element', () => {
    const vNode = <div />;
    const el = DomGenerator.createElement(vNode);

    expect(el.tagName).toEqual('DIV');
  });

  it('should create an text node from a string', () => {
    const vNode = 'oi';
    const el = DomGenerator.createElement(vNode);

    expect(el.nodeType).toEqual(TEXT_NODE_TYPE);
    expect(el.textContent).toEqual(vNode);
  });

  it('should create an text node from a number', () => {
    const vNode = 3;
    const el = DomGenerator.createElement(vNode);

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

    const el = DomGenerator.createElement(vNode);

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

    const el = DomGenerator.createElement(vNode);

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

    const el = DomGenerator.createElement(vNode);

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

      const el = DomGenerator.createElement(vNode);
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

      const el = DomGenerator.createElement(vNode);
      document.body.appendChild(el);
      const elsWithClass = document.getElementsByClassName('test');

      expect(elsWithClass).toHaveLength(2);
    });

    it('should not set props of non-Object values', () => {
      const divString = '<div></div>';
      const vNode = createVNode('div', 'teste');
      const vNode2 = createVNode('div', 3);
      const vNode3 = createVNode('div');
      const el = DomGenerator.createElement(vNode);
      const el2 = DomGenerator.createElement(vNode2);
      const el3 = DomGenerator.createElement(vNode3);

      expect(el.outerHTML).toEqual(divString);
      expect(el2.outerHTML).toEqual(divString);
      expect(el3.outerHTML).toEqual(divString);
    });
  });
});

describe('test DomGenerator.generate', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="app"></div>';
  });

  it('should generate dom elements from VirtualNode', () => {
    const div = <div />;
    DomGenerator.generate(document.getElementById('app'), div);

    expect(document.getElementById('app').innerHTML).toEqual('<div></div>');
  });

  it('should insert new div', () => {
    const oldNode = <div />;

    const element = DomGenerator.generate(document.getElementById('app'), oldNode, null, null);
    const node = (
      <div>
        <div />
      </div>
    );

    DomGenerator.generate(document.getElementById('app'), node, oldNode, element);

    expect(document.getElementById('app').innerHTML).toEqual('<div><div></div></div>');
  });

  it('shoud render text', () => {
    const node = 'foo';
    DomGenerator.generate(document.getElementById('app'), node);

    expect(document.getElementById('app').innerHTML).toEqual('foo');
  });

  it('should update only the texnode from the h1', () => {
    const oldNode = (
      <div>
        <h1 id="title">Foo</h1>
      </div>
    );

    const element = DomGenerator.generate(document.getElementById('app'), oldNode, null, null);
    const title = document.getElementById('title');

    const node = (
      <div>
        <h1 id="title">Bar</h1>
      </div>
    );
    DomGenerator.generate(document.getElementById('app'), node, oldNode, element);

    expect(title.innerHTML).toEqual('Bar');
  });
});
