class Tree {
  constructor() {
    this.parent = null;
  }

  root() {
    return (this.parent ? this.parent.root() : this);
  }

  connected(tree) {
    return this.root() === tree.root();
  }

  connect(tree) {
    return (tree.root().parent = this);
  }

}

export default Tree;
