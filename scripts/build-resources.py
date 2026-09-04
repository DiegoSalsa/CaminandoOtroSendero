"""Generate only the new static knowledge centre; standard library, no runtime JS.

Run from any directory: python scripts/build-resources.py [--check]
Never writes legacy files, footer, root sitemap, robots, or configuration.
"""
import csv
import io
import json
import pathlib
import sys
from html import escape as e

ROOT = pathlib.Path(__file__).resolve().parent.parent
BASE = 'https://www.caminandootrosendero.cl'
HUB = '/pages/recursos'
DATE = '2026-09-03'
ORG = {'@type':'Organization','@id':BASE+'/#organization','name':'Caminando Otro Sendero SpA','legalName':'Caminando Otro Sendero SpA','url':BASE+'/'}
SOURCES = json.loads((ROOT/'content/recursos/sources.json').read_text(encoding='utf8'))
ORDER = ['entomofauna','insectos-estudios-ambientales','aracnidos-estudios-ambientales','muestreo-entomofauna','macroinvertebrados-bentonicos','macroinvertebrados-bioindicadores','identificacion-taxonomica-macroinvertebrados']
ARTICLES = [json.loads((ROOT/f'content/recursos/{slug}.json').read_text(encoding='utf8')) for slug in ORDER]
BY_SLUG = {a['slug']:a for a in ARTICLES}
FILES = {}

def breadcrumb(items):
    return '<nav class="r-breadcrumb" aria-label="Migas de pan"><ol>'+''.join(f'<li><a href="{url}">{e(name)}</a></li>' if i<len(items)-1 else f'<li aria-current="page">{e(name)}</li>' for i,(name,url) in enumerate(items))+'</ol></nav>'

def layout(path,title,description,h1,intro,body,crumbs,kind='CollectionPage',extra=None,category='Centro de conocimiento ambiental'):
    canonical=BASE+path
    page={'@type':kind,'@id':canonical+'#document','url':canonical,'name':title,'description':description,'inLanguage':'es-CL','dateModified':DATE}
    if kind=='TechArticle': page.update(headline=h1,author={'@id':ORG['@id']},publisher={'@id':ORG['@id']},mainEntityOfPage=canonical)
    if extra: page.update(extra.pop('page',{}))
    graph=[ORG,page,{'@type':'BreadcrumbList','itemListElement':[{'@type':'ListItem','position':i+1,'name':name,'item':BASE+url} for i,(name,url) in enumerate(crumbs)]}]
    if extra: graph.extend(extra.get('nodes',[]))
    schema=json.dumps({'@context':'https://schema.org','@graph':graph},ensure_ascii=False).replace('<','\\u003c')
    return f'''<!DOCTYPE html>
<html lang="es-CL"><head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>{e(title)}</title>
<meta name="description" content="{e(description)}">
<meta name="robots" content="index,follow,max-image-preview:large">
<meta name="author" content="Caminando Otro Sendero SpA">
<link rel="canonical" href="{canonical}">
<meta property="og:type" content="{'article' if kind=='TechArticle' else 'website'}"><meta property="og:locale" content="es_CL">
<meta property="og:site_name" content="Caminando Otro Sendero SpA"><meta property="og:title" content="{e(title)}">
<meta property="og:description" content="{e(description)}"><meta property="og:url" content="{canonical}">
<meta name="theme-color" content="#203525"><link rel="icon" href="/favicon.ico">
<link rel="stylesheet" href="/css/recursos.css">
<script type="application/ld+json">{schema}</script>
</head><body class="resource-site">
<a class="r-skip" href="#contenido">Saltar al contenido</a>
<header class="r-header"><div class="r-wrap"><a class="r-brand" href="/"><img src="/assets/client/logo-client-280.webp" width="64" height="64" alt=""><span>Caminando<br>Otro Sendero</span></a><nav aria-label="Navegación principal"><a href="/pages/servicios">Servicios</a><a href="/pages/sobre-nosotros">Nosotros</a><a href="/pages/contacto">Contacto</a></nav></div></header>
<main id="contenido"><div class="r-hero"><div class="r-wrap">{breadcrumb(crumbs)}<p class="r-eyebrow">{e(category)}</p><h1>{e(h1)}</h1><p class="r-intro">{e(intro)}</p><p class="r-meta">Caminando Otro Sendero SpA · Actualización editorial: <time datetime="{DATE}">3 de septiembre de 2026</time></p></div></div>{body}</main>
<footer class="r-footer"><div class="r-wrap"><p>Caminando Otro Sendero SpA · Conocimiento ambiental</p><a href="{HUB}">Centro de conocimiento</a><a href="/pages/contacto">Contacto</a><a href="/pages/privacidad">Privacidad</a></div></footer>
</body></html>
'''

def card(a):
    return f'<article class="r-card"><h3><a href="{HUB}/{a["slug"]}">{e(a["h1"])}</a></h3><p>{e(a["description"])}</p><a class="r-card-link" href="{HUB}/{a["slug"]}">Leer recurso<span aria-hidden="true"> ↗</span><span class="r-card-context">: {e(a["keyword"])}</span></a></article>'

def article(a):
    refs=list(dict.fromkeys(key for s in a['sections'] for key in s.get('sources',[])))
    sections=''
    for s in a['sections']:
        sections+=f'<section id="{s["id"]}"><h2>{e(s["heading"])}</h2>'+''.join(f'<p>{e(p)}</p>' for p in s['paragraphs'])
        if s.get('sources'): sections+='<p class="r-citations">Fuentes: '+', '.join(f'<a href="#ref-{k}">{e(SOURCES[k]["title"].split(".")[0])} [{refs.index(k)+1}]</a>' for k in s['sources'])+'.</p>'
        sections+='</section>'
    service='Ver servicio de línea base de artrópodos' if a['service']=='linea-base-artropodos' else 'Ver servicio de taxonomía acuática'
    sections+=f'<section class="r-service" id="servicio"><h2>Servicio relacionado</h2><p>Para consultar el alcance técnico publicado por Caminando Otro Sendero:</p><a href="/pages/servicios/{a["service"]}">{service}</a></section>'
    sections+='<section id="preguntas"><h2>Preguntas frecuentes</h2>'+''.join(f'<div class="r-faq"><h3>{e(q)}</h3><p>{e(ans)}</p></div>' for q,ans in a['faqs'])+'</section>'
    sections+='<section id="relacionados"><h2>Recursos relacionados</h2><ul>'+''.join(f'<li><a href="{HUB}/{slug}">{e(BY_SLUG[slug]["h1"])}</a></li>' for slug in a['related'])+f'</ul><a href="{HUB}">Volver al Centro de conocimiento</a></section>'
    sections+='<section id="referencias"><h2>Referencias y alcance de las fuentes</h2><ol class="r-reference">'+''.join(f'<li id="ref-{key}"><a href="{e(SOURCES[key]["url"])}">{e(SOURCES[key]["title"])}</a><small>{e(SOURCES[key]["scope"])}</small></li>' for key in refs)+'</ol></section>'
    sections+=f'<section class="r-person" id="edicion"><h2>Responsabilidad editorial</h2><p>Contenido de Caminando Otro Sendero SpA elaborado como síntesis documental. Los ejemplos hipotéticos se identifican como tales. No se atribuye una revisión científica individual sin constancia de esa revisión.</p><a href="{HUB}/autores/luis-carrera-suarez">Conocer la trayectoria documentada de Luis E. Carrera Suárez</a></section>'
    toc='<aside class="r-aside"><nav aria-label="Índice del artículo"><h2>En este recurso</h2><ol>'+''.join(f'<li><a href="#{s["id"]}">{e(s["heading"])}</a></li>' for s in a['sections'])+'<li><a href="#preguntas">Preguntas frecuentes</a></li><li><a href="#referencias">Referencias</a></li></ol></nav></aside>'
    body='<div class="r-wrap r-body"><div class="r-prose">'+sections+'</div>'+toc+'</div>'
    return layout(HUB+'/'+a['slug'],a['title'],a['description'],a['h1'],a['intro'],body,[('Inicio','/'),('Centro de conocimiento',HUB),(a['keyword'].capitalize(),HUB+'/'+a['slug'])],kind='TechArticle',category=a['cluster'],extra={'page':{'citation':[SOURCES[k]['url'] for k in refs],'about':[{'@type':'Thing','name':a['keyword']}],'isPartOf':{'@id':BASE+HUB+'#document'}}})

hub_intro='El Centro de conocimiento ambiental reúne recursos sobre entomofauna, artrópodos, macroinvertebrados y taxonomía acuática. Encontrarás definiciones, criterios para interpretar estudios, límites de los métodos y referencias consultables. Es un espacio de Caminando Otro Sendero SpA para comprender la evidencia de biodiversidad y su relación con los servicios ambientales, sin sustituir el análisis particular de cada proyecto.'
body='<div class="r-wrap r-hub">'
for category in dict.fromkeys(a['cluster'] for a in ARTICLES):
    body+=f'<section class="r-category"><h2>{e(category)}</h2><div class="r-grid">'+''.join(card(a) for a in ARTICLES if a['cluster']==category)+'</div></section>'
body+=f'<section class="r-category"><h2>Especialistas y publicaciones</h2><div class="r-grid"><article class="r-card"><h3><a href="{HUB}/autores">Autores y especialistas</a></h3><p>Trayectoria profesional documentada y publicaciones con identidad, autoría y afiliación verificables.</p><a class="r-card-link" href="{HUB}/autores/luis-carrera-suarez">Luis E. Carrera Suárez ↗</a></article><article class="r-card"><h3><a href="/pages/publicaciones">Publicaciones de la web institucional</a></h3><p>Consulta la sección de investigación existente. Las publicaciones de una persona se distinguen de los trabajos realizados por la empresa.</p></article></div></section><section class="r-note"><h2>Cómo usar estos recursos</h2><p>Comienza por las definiciones de entomofauna o macroinvertebrados bentónicos. Continúa con las guías de estudio e identificación y revisa las fuentes al final de cada artículo. Para una necesidad de proyecto, consulta el servicio relacionado y confirma su alcance técnico.</p><p>Las referencias internacionales se presentan con su ámbito de aplicación. Una técnica descrita en la literatura no se atribuye automáticamente a Caminando Otro Sendero.</p></section></div>'
FILES['pages/recursos.html']=layout(HUB,'Centro de conocimiento ambiental | Caminando Otro Sendero','Recursos sobre entomofauna, artrópodos, macroinvertebrados y taxonomía acuática, con referencias, preguntas frecuentes y especialistas documentados.','Centro de conocimiento ambiental',hub_intro,body,[('Inicio','/'),('Centro de conocimiento',HUB)])
for a in ARTICLES: FILES[f'pages/recursos/{a["slug"]}.html']=article(a)

person_url=HUB+'/autores/luis-carrera-suarez'
person_id=BASE+'/pages/sobre-nosotros#luis-carrera'
person={'@type':'Person','@id':person_id,'name':'Luis E. Carrera Suárez','url':BASE+person_url,'jobTitle':'Biólogo especialista en invertebrados y consultor ambiental','worksFor':{'@id':ORG['@id']},'subjectOf':{'@id':'https://doi.org/10.7717/peerj.15020'}}
paper_title='Could an event of extreme drought (2019-2020) affect the feeding ecology of Bubo magellanicus (Gmelin 1788) (Strigiformes: Strigidae) in a Mediterranean region of Chile?'
paper={'@type':'ScholarlyArticle','@id':'https://doi.org/10.7717/peerj.15020','name':paper_title,'url':'https://peerj.com/articles/15020/','identifier':'10.7717/peerj.15020','datePublished':'2023-05-01','pagination':'e15020','isPartOf':{'@type':'PublicationVolume','volumeNumber':'11','isPartOf':{'@type':'Periodical','name':'PeerJ'}},'author':[{'@type':'Person','name':'Sam Catchpole Ahumada'},{'@id':person_id},{'@type':'Person','name':'Reinaldo Rivera'}]}
body=f'''<div class="r-wrap r-body"><div class="r-prose"><section><h2>Vínculo con Caminando Otro Sendero</h2><p>La página institucional Sobre Nosotros presenta a Luis E. Carrera Suárez como fundador y biólogo especialista en invertebrados, investigador y consultor ambiental. Su sección de dirección científica relaciona su trayectoria con evaluación de ecosistemas, fauna y taxonomía.</p><p>Fuente: <a href="/pages/sobre-nosotros#luis-carrera">perfil publicado por la empresa</a>. Esta ficha conserva el alcance de esa información; no añade universidad, grados académicos, certificaciones ni identificadores profesionales sin verificación.</p></section>
<section id="publicacion"><h2>Publicación científica verificada</h2><h3>{e(paper_title)}</h3><p>Sam Catchpole Ahumada, Luis Carrera Suárez y Reinaldo Rivera (2023). <em>PeerJ</em>, volumen 11, artículo e15020. Publicado el 1 de mayo de 2023. La revista identifica el artículo mediante e15020; no se añade un número de fascículo ni un intervalo de páginas inexistente.</p><p><a href="https://doi.org/10.7717/peerj.15020">DOI: 10.7717/peerj.15020</a> · <a href="https://peerj.com/articles/15020/">Página editorial</a> · <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC10158770/">Texto íntegro en PubMed Central</a></p><p>El trabajo estudia la ecología alimentaria de <em>Bubo magellanicus</em> en relación con un evento de sequía en una región mediterránea de Chile. Se presenta como producción científica del autor, junto con sus coautores; no como un estudio ejecutado por Caminando Otro Sendero SpA.</p><p><strong>Afiliación declarada para Luis Carrera Suárez en el artículo:</strong> Caminando Otro Sendero E.I.R.L, Talcahuano, Biobío, Chile. Se conserva la denominación histórica de la publicación. Su relación jurídica con la razón social actual SpA está pendiente de verificar; no se afirma una transformación societaria.</p></section>
<section><h2>Cómo interpretar la trayectoria</h2><p>La participación en un artículo acredita esa autoría científica concreta. No demuestra por sí sola una acreditación profesional, un cargo actual fuera de lo publicado por la empresa ni la revisión de los recursos de este centro. Cada una de esas afirmaciones necesita su propia evidencia.</p><p>No se ha incorporado un ORCID porque no se verificó un identificador inequívoco para esta ficha. Tampoco se atribuye a Luis la autoría o revisión de los artículos nuevos. Cuando una revisión nominativa esté documentada, podrá indicarse en el recurso correspondiente con su fecha.</p></section>
<section><h2>Recursos relacionados</h2><ul><li><a href="{HUB}/entomofauna">Entomofauna y estudios ambientales</a></li><li><a href="{HUB}/identificacion-taxonomica-macroinvertebrados">Identificación taxonómica de macroinvertebrados</a></li><li><a href="/pages/publicaciones">Otras publicaciones en el sitio institucional</a></li></ul></section><section><h2>Fuentes de la ficha</h2><ul><li><a href="/pages/sobre-nosotros#luis-carrera">Caminando Otro Sendero: Sobre Nosotros</a>, consultado el 3 de septiembre de 2026.</li><li><a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC10158770/">Artículo íntegro y afiliaciones, PubMed Central</a>.</li></ul></section></div><aside class="r-aside"><h2>Especialista documentado</h2><p>Invertebrados, investigación y consultoría ambiental, según la presentación institucional.</p><a href="{HUB}/autores">Volver a autores y especialistas</a></aside></div>'''
FILES['pages/recursos/autores/luis-carrera-suarez.html']=layout(person_url,'Luis E. Carrera Suárez: trayectoria y publicación científica','Perfil documentado de Luis E. Carrera Suárez: vínculo institucional, publicación científica verificada, coautores y afiliación histórica declarada.','Luis E. Carrera Suárez','Luis E. Carrera Suárez es presentado por Caminando Otro Sendero como biólogo especialista en invertebrados, investigador, consultor ambiental y fundador de la empresa. Esta ficha reúne esa relación institucional y una publicación científica verificable. Distingue su trayectoria personal de los trabajos de la sociedad actual y de la autoría de los recursos nuevos.',body,[('Inicio','/'),('Centro de conocimiento',HUB),('Autores',HUB+'/autores'),('Luis E. Carrera Suárez',person_url)],kind='ProfilePage',extra={'page':{'mainEntity':{'@id':person_id}},'nodes':[person,paper]})
body=f'<div class="r-wrap r-hub"><section class="r-category"><h2>Trayectorias documentadas</h2><article class="r-card"><h3><a href="{person_url}">Luis E. Carrera Suárez</a></h3><p>Biólogo especialista en invertebrados y consultor ambiental, según la presentación institucional. Consulta su vínculo con la empresa y una publicación con coautores y afiliación verificados.</p><a class="r-card-link" href="{person_url}">Ver ficha y publicación ↗</a></article></section><section class="r-note"><h2>Autoría y revisión son funciones distintas</h2><p>La presencia de un especialista en este directorio no significa que haya escrito o revisado todos los recursos. Cada artículo informa su responsabilidad editorial. Una revisión científica individual solo se incorpora cuando existe constancia de ella.</p><p>Los antecedentes históricos conservan sus afiliaciones originales. La razón social actual es Caminando Otro Sendero SpA; no se asume continuidad jurídica con denominaciones externas anteriores.</p></section></div>'
FILES['pages/recursos/autores.html']=layout(HUB+'/autores','Autores y especialistas | Caminando Otro Sendero','Directorio de especialistas con vínculo institucional documentado, referencias científicas y criterios para distinguir autoría, revisión y afiliación.','Autores y especialistas','Este directorio reúne especialistas cuya relación con Caminando Otro Sendero puede documentarse. Cada ficha identifica las fuentes que sustentan el vínculo institucional y las publicaciones incluidas. La trayectoria de una persona se presenta con su propio alcance: no convierte automáticamente sus investigaciones anteriores en trabajos de la empresa ni acredita la revisión de todos los artículos.',body,[('Inicio','/'),('Centro de conocimiento',HUB),('Autores y especialistas',HUB+'/autores')])

urls=[BASE+'/'+f.removesuffix('.html') for f in FILES]
FILES['sitemap-recursos.xml']='<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'+''.join(f'  <url><loc>{u}</loc></url>\n' for u in urls)+'</urlset>\n'

def as_csv(rows,fields):
    buf=io.StringIO(newline=''); writer=csv.DictWriter(buf,fieldnames=fields); writer.writeheader(); writer.writerows(rows); return buf.getvalue()

FILES['docs/seo/new-url-inventory.csv']=as_csv([{'url':u,'file':f,'estado':'implementado local; no desplegado','fecha_publicacion':''} for u,f in zip(urls,[f for f in FILES if f.endswith('.html')])],['url','file','estado','fecha_publicacion'])
links=[]
for a in ARTICLES:
    src=BASE+HUB+'/'+a['slug']
    links.extend({'origen':src,'destino':BASE+HUB+'/'+r,'tipo':'recurso relacionado'} for r in a['related'])
    links.extend([{'origen':src,'destino':BASE+HUB,'tipo':'hub'},{'origen':BASE+HUB,'destino':src,'tipo':'descubrimiento'},{'origen':src,'destino':BASE+'/pages/servicios/'+a['service'],'tipo':'servicio legacy'},{'origen':src,'destino':BASE+person_url,'tipo':'especialista documentado'}])
links.extend([{'origen':'footer de las 16 páginas legacy','destino':BASE+HUB,'tipo':'única inserción autorizada'},{'origen':BASE+HUB,'destino':BASE+HUB+'/autores','tipo':'directorio'},{'origen':BASE+HUB+'/autores','destino':BASE+person_url,'tipo':'ficha'}])
FILES['docs/seo/internal-link-map.csv']=as_csv(links,['origen','destino','tipo'])
failed=[]
for name,content in FILES.items():
    target=ROOT/name
    if '--check' in sys.argv:
        if not target.exists() or target.read_bytes()!=content.encode('utf8'): failed.append(name)
    else:
        target.parent.mkdir(parents=True,exist_ok=True); target.write_bytes(content.encode('utf8'))
if failed: raise SystemExit('Generated output differs: '+', '.join(failed))
print(('Verified' if '--check' in sys.argv else 'Generated')+f' {len(urls)} new HTML pages and {len(FILES)-len(urls)} support files. Legacy untouched.')
