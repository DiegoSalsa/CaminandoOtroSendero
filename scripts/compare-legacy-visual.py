"""Compare stable legacy captures, masking ONLY the new link rectangle. Requires Pillow."""
import json,pathlib
from PIL import Image,ImageChops,ImageDraw
ROOT=pathlib.Path(__file__).resolve().parent.parent
before=json.loads((ROOT/'docs/seo/legacy-visual-verified-before.json').read_text(encoding='utf8'))
after=json.loads((ROOT/'docs/seo/legacy-visual-after.json').read_text(encoding='utf8'))
results=[]
for a,b in zip(before,after):
    assert a['file']==b['file']
    im1=Image.open(ROOT/a['screenshot']).convert('RGB'); im2=Image.open(ROOT/b['screenshot']).convert('RGB')
    sizeok=im1.size==im2.size
    box=b['addedLink']; box=(int(box['x'])-2,int(box['y'])-2,int(box['x']+box['width'])+2,int(box['y']+box['height'])+2)
    for im in (im1,im2): ImageDraw.Draw(im).rectangle(box,fill='black')
    bbox=ImageChops.difference(im1,im2).getbbox() if sizeok else None
    results.append(dict(file=a['file'],sameDimensions=sizeok,domEqual=a['dom']==b['dom'],diffBoundingBox=bbox,passPixels=sizeok and bbox is None,footerLinks=b['footerLinks'],maskedOnlyNewLink=box))
(ROOT/'docs/seo/legacy-visual-comparison.json').write_text(json.dumps(results,indent=2),encoding='utf8')
assert len(results)==16 and all(r['passPixels'] and r['domEqual'] and r['footerLinks']==1 for r in results)
print('PASS: 16/16 legacy screenshots and DOM identical outside the new link.')
