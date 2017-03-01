# Form Validator for Angular 2 (Beta)

## Usage

### Declarations
Import and declare in *app.module.ts*

```
import { FormValidatorDirective } from './../form-validator.directive';

@NgModule({
  declarations: [
    ...
    FormValidatorDirective
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
```

### HTML and Component
Create the form into the HTML page and call the directive on ```<form>```

```
<form FormValidator novalidate (formSubmit)="foo()" [formModel]="data">
    <input name="name" type="text" required
           [(ngModel)]="data.name" [ngModelOptions]="{standalone: true}">    
    
    <button type="submit">Foo</button>
</form>
```

You must create the "```foo()```" function on Component, like this:

```
import { ... } from ...

@Component({
  ...
})
export class MyComponent {
    data: any;

    foo() {
        // that's my submit function :)
    }  
}
```

The ```[formModel]``` is all the ngModel of your form.

### Validations

#### Required

Use in required elements

```
<input type="text" required ... >
```

#### Number

Use in just number elements

```
<input type="text" number ... >
```

### Class Attribute

To change the style you must to "re-style" these properties:

```
.fv-valid{
    border-color: green;
}

.fv-invalid{
    border-color: red;
}
```

### Created by Gustavo Sales