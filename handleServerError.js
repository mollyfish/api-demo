module.exports = function(err, res) { 
2   console.log(err); 
3   res.status(500).json({msg: 'server error'}); 
4 }; 
