---
sidebar_position: 5
---

# EXTRAS!!!!! (custom encoder knob!)
got my hackpad parts here and noticed that the encoders were pretty cool so heres an extra tutorial for custom knobs <br/>

I'll be using the rotary encoders that come in with the Hackpad Kit (EC11 rotary encoder from my research, don't quote me on that), along with a pair of calipers to get the measurements. If you search up the encoder you have, you can also find the dimensions there. <br/>

# ok how start
The encoder that comes with the kit is a D-shaft, meaning that the profile is a cylinder with a segment removed, making the profile look like a D. To get the proper dimensions, we have to measure the **diameter** of the shaft, the distance between the **chord** and the opposite side of the circle, and the **step distance** of the missing segment. <br/>

![dimensioning hours](https://github.com/user-attachments/assets/4e4e2d22-5129-4d8a-a61f-ca248b67da37)

Once we have the dimensions, we can start modeling! <br/>

First, create a new Workspace and create a new sketch. When you're in the sketch, recreate the profile of the D-shaft using the dimensions above! <br/>
* We can do this by first creating the outer diameter with the Circle tool, making the diameter the one we found earlier. (centering the circle on the origin helps a lot here too!)

![circles](https://github.com/user-attachments/assets/b890fa42-6785-43d5-9229-d59ae4c2203e)

* Next, we will create the beginning of our chord by drawing a line somewhere on the circle, which will cut through this circle. We will be using the **Constraint Tools** and the **Dimension Tool** to complete this sketch!

![line](https://github.com/user-attachments/assets/66c74fba-2843-40dc-aa85-515625ce4caa)

* Currently, our line can move anywhere it wants, which is bad in our case since we want everything to the right dimensions! To fix this, apply the **Horizontal/Vertical Tool**, which will constrain our chord to be perfectly horizontal no matter what!

> fun fact: Fusion can automatically apply this constraint when making a line! Just look for the Horizontal/Vertical symbol when drawing your line!

![horizontal](https://github.com/user-attachments/assets/0d75d575-e756-4c29-a794-12184aaee0c7)

* However, our line can still move up and down, which is *still* not what! To fix this, we can make a new line above the circle, applying the **Horizontal/Vertical Tool** to this line as well.
* Once we have that line, we can use **Tangent Constraint** to make the new line tangent to the outer diameter. To put this physically, this is the point of the outer diameter that was touching the calipers when we recorded the 4.5mm chord-to-diameter measurement!

![tan tan tan](https://github.com/user-attachments/assets/75afe2c3-74d0-45e6-a7c6-20a04a406de5)

* After that, use the **Dimension Tool** to make a dimension between the tangent line and the chord! This should be what you recorded for the chord-to-diameter measurement, or in our case, 4.5mm!

![measur](https://github.com/user-attachments/assets/85f93dd1-a121-491c-b723-5fad3001282a)

Once you have that, we can start working on the outside of the knob! <br/>
The knob can be customized to whatever shape or size you want, but for this tutorial, we will be using a standard circle. <br/>

To make the knob, make a circle with the *same* center as the outer diameter of the D-shaft (can also be the origin if you centered everything on it) and dimension it to 12.5mm.

![knob size](https://github.com/user-attachments/assets/2163febe-a039-4eed-827a-01df6c51a529)

Once we have that, finish the sketch and extrude **EVERYTHING**! This should just leave us with a massive cylinder 12.5mm in diameter. <br/>
Again, the size can be customized to your liking, but I will be using 15mm for this guide.

![extrude da knob](https://github.com/user-attachments/assets/0abf4809-0410-4fb9-b2b0-9e4739a302e2)

You might be thinking to yourself that what we did with the shaft was *pointless*, since we literally just ignored it with this extrude. And while it may not be visible, we can change that by going into the **Sketches Folder** in the left-hand menu and unhiding the sketch by clicking the eye. <br/>

![unhiding](https://github.com/user-attachments/assets/faec5117-181f-46f7-804b-f0584f74a8d7)

Once we unhide the sketch, we can now reference this sketch with other tools, such as new sketches, extrude, loft, etc. We will be using this first sketch to create the hole to fit our encoder's D-shaft! <br/>
Go to the bottom of the cylinder and use the **Extrude Tool**, clicking the larger segment of the circle to select it. Once it is selected, extrude it upwards by the **step distance** we found earlier, or in our case, 10mm.

![sketch referencing aah](https://github.com/user-attachments/assets/f0211fa8-4c34-4e78-8396-df3b1ecdbf82)

When we do that, we should have a hole that will perfectly fit our rotary encoder!
Lastly, we can finish up the knob by adding a quick chamfer to the top. Rotate to the top side of the knob and use the **Chamfer** tool on the edge of the knob, setting the distance to 1 mm.

![chamfers!](https://github.com/user-attachments/assets/6513f7bb-939a-4b7c-8e93-eaec3c3b7135)

Once you do that, you're done with your knob! Go ahead and gawk once again in amazement! <br/>

## extra extra stuff (knob customization)
You can easily apply some of the techniques from the custom keycaps to the knob, such as applying custom art or text on your knob! <br/>
Here is a small list of techniques I use to customize my knobs a little more:
* When extruding the knob, you can adjust something called the **Taper Angle**, which allows you to create knobs that get smaller or bigger as you reach the top! This allows you to make some pretty unique knobs, such as a professional looking volume knob or a big and goofy knob!
* You can add some parallel knurling (the texture used to improve grip) by going into the original sketch and adding a shape along the outside diameter, then using a **Circular Pattern** to copy the shape along the entire circumference. Once you have that, go into the first extrusion and exclude the shapes to get a knurling pattern along the side of the knob!
* As always, you can add a separate model on top of the knob and merge it with the knob to make a completely custom-shaped knob! For example, I modeled up a quick valve and merged it into a shortened version of this guide's knob!
![knurling](https://github.com/user-attachments/assets/42f44aab-f38a-4807-9b3a-4ba6d8447cef)
![valve](https://github.com/user-attachments/assets/3652e7a5-42f1-4fb8-9fa7-10197d2eddf9)




