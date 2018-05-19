import * as t from 'babel-types'

var currentMethod;
var currentIf;
var currentElse;
var currentElseIf;
var currentExpression;
var context = []

const updateClassMethod = {
    ClassMethod(path) {
        var statements = path.node.body.body
        context.push({ children: [] })
        path.traverse(updateClassMethod, {statements})
        var children = context.pop().children
        currentMethod = t.JSXElement(
            t.JSXOpeningElement(
                t.JSXIdentifier('MethodDeclarationGesture'), [], true
            ), null, children, false
        )
        children = context[context.length-1].children
        children.push(currentMethod)
        path.remove()
    },
    IfStatement(path) {
        var statements = path.node.consequent.body
        context.push({ children: [] })
        path.traverse(updateClassMethod, {statements})
        var children = context.pop().children
        currentIf = t.JSXElement(
            t.JSXOpeningElement(
                t.JSXIdentifier(path.key==='alternate'?'ElseIfGesture':'IfGesture'), [], true
            ), t.JSXClosingElement(
                t.JSXIdentifier(path.key==='alternate'?'ElseIfGesture':'IfGesture')), children, true
        )
        currentElse = null;
        if (path.node.alternate != null)
        {
            console.log("else:",path)
            statements = path.node.alternate.body
            context.push({ children: [] })
            //path.traverse(updateClassMethod, {statements})
            children = context.pop().children
            currentElse = t.JSXElement(
                t.JSXOpeningElement(
                    t.JSXIdentifier('ElseGesture'), [], true
                ), t.JSXClosingElement(
                    t.JSXIdentifier('ElseGesture')), children, true
            )
        }
        children = context[context.length-1].children
        children.push(currentIf)
        if (currentElse != null)
            children.push(currentElse)
        path.remove()
    },
    ExpressionStatement(path) {
        var expression = path.node.expression
        if (t.isCallExpression(expression))
        {
            currentExpression = t.JSXElement(
                t.JSXOpeningElement(
                    t.JSXIdentifier('MethodInvocationGesture'), [], true
                ), null, [], true
            )
        }
        else if (t.isUpdateExpression(expression) || t.isAssignmentExpression(expression) )
        {
            currentExpression = t.JSXElement(
                t.JSXOpeningElement(
                    t.JSXIdentifier('ExpressionGesture'), [], true
                ), null, [], true
            )
        }
        var children = context[context.length-1].children
        children.push(currentExpression)
        path.remove()
    }
  };

export default (babel) => {
    var currentClass;
    var t = babel.types
    return {
        visitor: {
            ClassDeclaration: function(path) {
                var classBody = path.node.body
                var methods = classBody.body
                context.push({ children: [] })
                path.traverse(updateClassMethod, {methods})
                var children = context.pop().children
                currentClass = t.JSXElement(
                    t.JSXOpeningElement(
                        t.JSXIdentifier('ClassGesture'), [], true
                    ), null, children, false
                )
                path.replaceWithMultiple(
                    [
                        t.ExpressionStatement(currentClass)
                    ]
                )
            },
            ExpressionStatement: function(path) {
                var call = path.node.expression
                if (t.isCallExpression(call))
                {
                    path.replaceWith(
                        t.ExpressionStatement(
                            t.JSXElement(
                                t.JSXOpeningElement(
                                    t.JSXIdentifier('MethodInvocationGesture'), [], true
                                ), null, [], true
                            )
                        )
                    )
                }
            }
        }
    }
}
