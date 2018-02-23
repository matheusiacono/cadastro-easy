/* globals describe it expect */
import DomGenerator from '.';
import createVNode from '../create-v-node';

const TEXT_NODE_TYPE = 3;

describe('DomGenerator.createElement', () => {
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
});
