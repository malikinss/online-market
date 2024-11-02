import React, { Component } from "react";

export class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [
        {
          id: "all",
          name: "All Categories",
        },
      ],
      selectedCategory: "all",
    };
  }

  componentDidMount() {
    fetch("http://127.0.0.1:5000/api/category", {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          categories: [{ id: "all", name: "All Categories" }, ...data],
        });
      })
      .catch((error) => console.error("Error fetching categories:", error));
  }

  selectCategory = (categoryId) => {
    this.setState({ selectedCategory: categoryId });
    this.props.onCategoryChange(categoryId);
  };

  render() {
    return (
      <div className="categories">
        {this.state.categories.map((el) => (
          <div key={el.id} onClick={() => this.props.chooseCategory(el.id)}>
            {el.name}
          </div>
        ))}
      </div>
    );
  }
}

export default Categories;
