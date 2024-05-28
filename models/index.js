const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// post belongs to a user
Post.belongsTo(User, {
    foreignKey: 'userId',
    onDelete: 'CASCADE',
});

// post can have many comments
Post.hasMany(Comment, {
    foreignKey: 'postId',
    onDelete: 'CASCADE',
});

// comment can belong to a user
Comment.belongsTo(User, {
    foreignKey: 'userId',
    onDelete: 'CASCADE',
});

// comment belongs to a post
Comment.belongsTo(Post, {
    foreignKey: 'postId',
    onDelete: 'CASCADE',
});

module.exports = {
    User,
    Post,
    Comment,
};