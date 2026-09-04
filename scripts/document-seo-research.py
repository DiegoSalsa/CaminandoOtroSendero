"""Compile sourced keyword and backlink inventories from the supplied Semrush export."""
import csv,json,pathlib,re,collections
ROOT=pathlib.Path(__file__).resolve().parent.parent
DATA=ROOT/'semrush-caminando-otro-sendero'
OUT=ROOT/'docs/seo'
def read(p):return list(csv.DictReader(p.open(encoding='utf-8-sig',newline='')))
def write(p,rows):
    with p.open('w',encoding='utf8',newline='') as f:
        w=csv.DictWriter(f,fieldnames=list(rows[0]));w.writeheader();w.writerows(rows)
master={r['keyword']:r for r in read(DATA/'17-summary/master-keywords.csv')}
positions={r['keyword']:r for r in read(DATA/'02-position-tracking/positions-normalized.csv')}
rows=[]
for p in sorted((ROOT/'content/recursos').glob('*.json')):
    a=json.loads(p.read_text(encoding='utf8'))
    if 'slug' not in a:continue
    key=a['keyword'];m=master.get(key,{});pos=positions.get(key,{})
    rows.append({'URL':'https://www.caminandootrosendero.cl/pages/recursos/'+a['slug'],'cluster':a['cluster'],'keyword_principal':key,'keywords_secundarias':a['secondary'],'intencion':'informativa / técnica; no landing comercial','volumen_disponible':m.get('volume') or 'n/d','KD_disponible':m.get('kd') or 'n/d','URL_comercial_apoyada':'https://www.caminandootrosendero.cl/pages/servicios/'+a['service'],'riesgo_canibalizacion':'medio: consulta ya asociada a servicio; mantener enfoque informativo' if pos.get('url') else 'bajo provisional: comprobar queries después de indexar','autor':'responsabilidad editorial: Caminando Otro Sendero SpA; sin revisor nominativo','estado':'implementado local; no desplegado','fecha_publicacion':'','URL_actual_position_tracking':pos.get('url') or 'sin URL registrada','posicion_actual':pos.get('position') or 'n/d','KD_position_tracking':pos.get('kd') or 'n/d','origen_metricas':'17-summary/master-keywords.csv; 02-position-tracking/positions-normalized.csv','fecha_reporte_position_tracking':pos.get('report_date') or 'n/d'})
write(OUT/'keyword-map.csv',rows)
domains=read(DATA/'08-backlink-gap/referring-domain-union.csv')
classified=[]
universities={'uc.cl','udec.cl','uchile.cl','uach.cl','ufro.cl','ubiobio.cl','unab.cl','uandes.cl','utalca.cl','pucv.cl','usach.cl'}
for r in domains:
    d=r['referring_domain']; evidence=' '.join([r.get('category_inference',''),r.get('source_url_examples',''),r.get('anchor_examples','')]).lower()
    category='institución';confidence='sin clasificar; requiere revisión';reason='No se deduce la naturaleza ni calidad solo del dominio.'
    if re.search(r'\bpbn\b|buy backlinks|backlinks online|dofollow backlinks|link building service',evidence):category='basura/PBN';confidence='señal explícita en exportación; validar página';reason='Anclas comerciales de enlaces o PBN: excluir de oportunidades; no implica contratación por competidores.'
    elif 'universidad' in evidence or d in universities or '.edu' in d:category='universidad';confidence='inferencia por dominio o categoría';reason='Comprobar relación académica real y URL pertinente.'
    elif '.gob.cl' in d or d.endswith('.gov'):category='organismo público';confidence='inferencia por dominio institucional';reason='Solo vínculos pertinentes a fuentes, proyectos o registros legítimos.'
    elif any(t in d for t in ['scielo','peerj','entomol','journal']):category='revista científica';confidence='inferencia por dominio';reason='Priorizar publicaciones verificadas, DOI y afiliación histórica.'
    elif any(t in d for t in ['repositorio','repository','researchgate','zenodo','redalyc']):category='repositorio';confidence='inferencia por dominio';reason='Verificar obra y autor; no crear perfiles o depósitos automáticamente.'
    elif d=='redobservadores.cl' or 'asociación' in evidence:category='asociación';confidence='inferencia temática';reason='Confirmar vínculo real y pertinencia de colaboración.'
    elif 'directorio' in evidence or 'proveedor/' in evidence:category='directorio legítimo';confidence='candidato sin legitimar';reason='La etiqueta es un casillero de revisión; comprobar identidad editorial y descartar enlaces automatizados.'
    elif any(t in evidence for t in ['noticia','revista','medio especializado']):category='medio especializado';confidence='inferencia editorial';reason='Verificar audiencia y contexto de la página fuente.'
    classified.append({'dominio':d,'categoria_provisional':category,'certeza':confidence,'criterio':reason,'authority_score_exportado':r.get('authority_score',''),'urls_ejemplo':r.get('source_url_examples',''),'fuente':r.get('source_files',''),'accion':'excluir de prospección' if category=='basura/PBN' else 'revisión humana; sin outreach'})
write(OUT/'offpage-domain-classification.csv',classified)
counts=collections.Counter(x['categoria_provisional'] for x in classified)
short=read(DATA/'08-backlink-gap/research-shortlist.csv')
text='# Oportunidades de autoridad externa\n\n'+f'Se revisó el inventario suministrado: **{len(domains)} dominios únicos**. La clasificación completa está en `offpage-domain-classification.csv`. Es un triaje basado en la exportación, no una validación web de todos los dominios. Las categorías y scores no garantizan calidad ni acceso.\n\n'
text+='## Categorías\n\n| Categoría | Criterio de selección |\n|---|---|\n'
for c,reason in [('universidad','Vínculo académico o colaboración documentada'),('revista científica','Autoría, DOI y afiliación comprobados'),('organismo público','Referencia pública pertinente al trabajo'),('asociación','Actividad o colaboración real'),('repositorio','Obra legítima y permisos de depósito'),('medio especializado','Cobertura editorial relevante'),('directorio legítimo','Entidad editorial e identidad verificadas'),('partner','Relación comercial o científica confirmada; ninguno se presume'),('institución','Naturaleza por verificar cuando falten datos'),('artículo técnico','Página concreta que pueda citar una fuente útil; no se deduce del dominio'),('basura/PBN','Anclas explícitas de venta de enlaces o PBN; exclusión preventiva')]:text+=f'| {c} | {reason} |\n'
text+='\n## Recuento provisional\n\n'+''.join(f'- {c}: {n}.\n' for c,n in counts.items())
text+='\n## Candidatos de la shortlist suministrada\n\n'+''.join(f'- **{r["referring_domain"]}**: {r.get("rationale","")} Estado: pendiente de validación.\n' for r in short)
text+='\n## Prioridad científica y acciones\n\n1. Verificar perfiles y producción científica de los especialistas.\n2. Identificar relaciones institucionales reales antes de proponer una mención.\n3. Considerar artículos técnicos útiles como recursos citables, sin solicitar intercambios artificiales.\n4. Documentar URL, contexto, contacto público y motivo de pertinencia antes de cualquier decisión del cliente.\n\nNo se enviaron mensajes, no se compraron enlaces y no se modificaron cuentas. No se generó disavow: las señales de dominios de competidores no prueban riesgo para el dominio propio.\n'
(OUT/'offpage-opportunities.md').write_text(text,encoding='utf8')
print('Documented',len(rows),'keyword assignments and',len(classified),'domains')
