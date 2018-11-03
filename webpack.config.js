module.exports = {
   entry: "./index.jsx",
   output: {
     filename: "bundle.js"
   },
   module: {
      rules: [
         { test: /\.jsx$/, use: 'babel-loader' }
      ]
   }
}
